import { memo } from "react";
import { useFetcher } from "@remix-run/react";
import { Product } from "@prisma/client";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard = memo(({ product, onAddToCart }: ProductCardProps) => {
  const fetcher = useFetcher();

  return (
    <div className="border rounded overflow-hidden flex flex-col">
      <div className="w-full h-48">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl text-black font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 text-lg">${product.price}</p>
        <fetcher.Form className="mt-auto" method="post">
          <input type="hidden" name="productId" value={product.id} />
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            type="submit"
            name="_action"
            value="addToCart"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
});

export default ProductCard;
