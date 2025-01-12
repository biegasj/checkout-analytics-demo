import { CartItem, Product } from "@prisma/client";
import { memo } from "react";

interface CartItemCardProps {
  item: CartItem & {
    product: Product;
  };
}

const CartItemCard = memo(({ item }: CartItemCardProps) => (
  <li className="flex py-6">
    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
      <img
        alt={item.product.imageAlt || "Product image"}
        src={item.product.imageUrl}
        className="h-full w-full object-cover"
      />
    </div>

    <div className="ml-4 flex flex-1 flex-col">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <h3>{item.product.name}</h3>
        <p className="ml-4">${item.product.price.toFixed(2)}</p>
      </div>
      <div className="flex flex-1 items-end justify-between text-sm">
        <p className="text-gray-500">Qty {item.quantity}</p>
        <button
          type="button"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Remove
        </button>
      </div>
    </div>
  </li>
));

export default CartItemCard;
