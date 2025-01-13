import { useState } from "react";
import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CartItem, Product } from "@prisma/client";

import CartButton from "~/components/cart/CartButton";
import CartDialog from "~/components/cart/CartDialog";
import ProductThumbnail from "~/components/product/ProductThumbnail";
import { getCartWithRelated } from "~/queries/cartQueries";
import { getAllProducts } from "~/queries/productQueries";
import { getOrCreateSessionId } from "~/utils/sessionUtils";
import {
  addToCartAction,
  removeCartItemAction,
  updateCartItemQuantityAction,
} from "~/routes/_index/actions";

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
  const cart = sessionId ? await getCartWithRelated(sessionId) : null;
  const totalQuantity =
    cart?.items.reduce(
      (sum: number, item: CartItem) => sum + item.quantity,
      0
    ) || 0;

  return { sessionId, products, cart, totalQuantity };
};

export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const { sessionId, session } = await getOrCreateSessionId(
    request.headers.get("Cookie")
  );

  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  switch (_action) {
    case "addToCart":
      return addToCartAction({ sessionId, session, formData });
    case "updateCartItemQuantity":
      return updateCartItemQuantityAction({ sessionId, session, formData });
    case "removeFromCart":
      return removeCartItemAction({ session, formData });
    default: {
      return new Response("Unknown action", { status: 400 });
    }
  }
};

export default function Index() {
  const { sessionId, products, cart, totalQuantity } =
    useLoaderData<typeof loader>();
  const [cartCount, setCartCount] = useState<number>(totalQuantity);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const handleAddToCart = () => setCartCount(cartCount + 1);

  return (
    <div className="container mx-auto max-w-screen-lg p-8 xl:mt-4 xl:mb-8 divide-y">
      {cart && (
        <CartDialog
          open={cartOpen}
          setOpen={setCartOpen}
          cartCount={cartCount}
          setCartCount={setCartCount}
          cart={cart}
          sessionId={sessionId}
        />
      )}
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
          <ProductThumbnail
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </main>
    </div>
  );
}
