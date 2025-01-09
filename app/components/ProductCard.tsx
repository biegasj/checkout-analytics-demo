import { Product } from "~/data/products";

const ProductCard = ({ product }: { product: Product }) => {
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
        <p className="text-gray-700 text-lg">${product.price.toFixed(2)}</p>
        <form method="post" action="/cart/add" className="mt-auto">
          <input type="hidden" name="productId" value={product.id} />
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCard;
