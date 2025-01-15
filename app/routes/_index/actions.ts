import {
  deleteCartItem,
  getCart,
  upsertCart,
  upsertCartItem,
} from "~/queries/cartQueries";
import { commitSession } from "~/sessions";
import { Session } from "@remix-run/node";
import { getProductPriceById } from "~/queries/productQueries";
import { validateProductIdAndQuantity } from "~/routes/_index/validate";

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

  validateProductIdAndQuantity(productId, quantity);

  const { price } = (await getProductPriceById(productId)) ?? {};
  if (!price) {
    throw new Response("Invalid input", { status: 400 });
  }

  const cart = await upsertCart(sessionId);
  const cartItem = await upsertCartItem(cart.id, productId, price, quantity);

  return new Response(JSON.stringify({ success: true, cartItem }), {
    headers: { "Set-Cookie": await commitSession(session) },
  });
};

export const updateCartItemQuantityAction = async ({
  sessionId,
  session,
  formData,
}: IndexActionArgs) => {
  const productId = Number(formData.get("productId") || -1);
  const quantity = Number(formData.get("quantity") || 1);

  validateProductIdAndQuantity(productId, quantity);

  const cart = await getCart(sessionId);
  if (!cart) {
    throw new Response("Cart not found", { status: 400 });
  }

  const { price } = (await getProductPriceById(productId)) ?? {};
  if (!price) {
    throw new Response("Product not found", { status: 400 });
  }

  const cartItem = await upsertCartItem(cart.id, productId, price, quantity);

  return Response.json(
    { success: true, cartItem },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
};

export const removeCartItemAction = async ({
  session,
  formData,
}: Omit<IndexActionArgs, "sessionId">) => {
  const productId = Number(formData.get("productId") || -1);
  const quantity = Number(formData.get("quantity") || 1);

  validateProductIdAndQuantity(productId, quantity);

  const deletedCartItem = await deleteCartItem(productId, quantity);

  return Response.json(
    { success: true, deletedCartItem },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
};
