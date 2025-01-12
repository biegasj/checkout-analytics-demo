import {
  deleteCartItem,
  upsertCart,
  upsertCartItem,
} from "~/queries/cartQueries";
import { commitSession } from "~/sessions";
import { Session } from "@remix-run/node";

interface IndexActionArgs {
  sessionId: string;
  session: Session;
  formData: FormData;
}

export const addToCartAction = async ({
  sessionId,
  session,
  formData,
}: IndexActionArgs) => {
  const productId = Number(formData.get("productId") || -1);
  const quantity = Number(formData.get("quantity") || 1);

  if (isNaN(productId) || productId <= 0 || isNaN(quantity)) {
    throw new Response("Invalid input", { status: 400 });
  }

  const cart = await upsertCart(sessionId);
  const cartItem = await upsertCartItem(cart.id, productId, quantity);

  return new Response(JSON.stringify({ success: true, cartItem }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": await commitSession(session),
    },
  });
};

export const removeCartItemAction = async ({
  session,
  formData,
}: Omit<IndexActionArgs, "sessionId">) => {
  const deletedCartItem = await deleteCartItem(
    Number(formData.get("cartId") || -1),
    Number(formData.get("productId") || -1)
  );

  return Response.json(
    { success: true, deletedCartItem },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};
