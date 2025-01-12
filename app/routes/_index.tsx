import { useState } from "react";
import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Product } from "@prisma/client";

import CartButton from "~/components/cart/CartButton";
import CartDialog from "~/components/cart/CartDialog";
import ProductCard from "~/components/ProductCard";
import { getCart, upsertCart, upsertCartItem } from "~/queries/cartQueries";
import { getAllProducts } from "~/queries/productQueries";
import { commitSession } from "~/sessions";
import { getOrCreateSessionId } from "~/utils/sessionUtils";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Checkout" },
    { name: "description", content: "Welcome to Remix Checkout!" },
  ];
};

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const { sessionId } = await getOrCreateSessionId(
    request.headers.get("Cookie")
  );

  const products = await getAllProducts();
  const cart = sessionId ? await getCart(sessionId) : null;
  const totalQuantity =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return { products, cart, totalQuantity };
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const { sessionId, session } = await getOrCreateSessionId(
    request.headers.get("Cookie")
  );

  const form = await request.formData();
  const productId = Number(form.get("productId") || -1);
  const quantity = Number(form.get("quantity") || 1);

  if (isNaN(productId) || isNaN(quantity)) {
    throw new Error("Invalid input");
  }

  const cart = await upsertCart(sessionId);
  const cartItem = await upsertCartItem(cart.id, productId, quantity);

  return Response.json(
    { success: true, cartItem },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export default function Index() {
  const { products, cart, totalQuantity } = useLoaderData<typeof loader>();
  const [cartCount, setCartCount] = useState<number>(totalQuantity);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const handleAddToCart = () => setCartCount(cartCount + 1);

  return (
    <div className="container mx-auto max-w-screen-lg p-8 xl:mt-4 xl:mb-8 divide-y">
      {cart && <CartDialog open={cartOpen} setOpen={setCartOpen} cart={cart} />}
      <header className="pb-8">
        <div className="flex justify-end items-center mb-8">
          <CartButton
            cartCount={cartCount}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Select Products
        </h1>
        <p className="mt-1 max-w-2xl text-md text-gray-500">
          This demo showcases the capabilities of the Remix framework, allowing
          users to browse products and complete the checkout process.
        </p>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 xl:pb-8">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </main>
    </div>
  );
}
