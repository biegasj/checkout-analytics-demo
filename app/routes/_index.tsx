import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Product, products } from "~/data/products";
import { useLoaderData } from "@remix-run/react";
import ProductCard from "~/components/ProductCard";
import CartButton from "~/components/CartButton";
import { useState } from "react";
import CartDialog from "~/components/CartDialog";

export const meta: MetaFunction = () => {
  return [
    { title: "Cart Analytics Demo" },
    { name: "description", content: "Welcome to Cart Analytics Demo!" },
  ];
};

export const loader: LoaderFunction = async () => {
  return products;
};

export default function Index() {
  const products = useLoaderData<typeof loader>();
  const [cartCount, setCartCount] = useState<number>(3);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  return (
    <div className="container mx-auto max-w-screen-lg p-8 xl:mt-4 xl:mb-8 divide-y">
        <CartDialog open={cartOpen} setOpen={setCartOpen} products={products} />
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
          This demo showcases the integration of the Piwik PRO Library for React
          while browsing products and completing the checkout process.
        </p>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 xl:pb-8">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}
