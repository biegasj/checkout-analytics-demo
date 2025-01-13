import { CartItem, Product } from "@prisma/client";
import { memo } from "react";

interface CartItemSummaryCardProps {
  item: CartItem & {
    product: Product;
  };
}

const CartItemSummaryCard = memo(({ item }: CartItemSummaryCardProps) => {
  const itemTotal = item.product.price * item.quantity;

  return (
    <li key={item.productId} className="flex py-6">
      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt={item.product.imageAlt}
          src={item.product.imageUrl}
          className="size-full object-cover"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.product.name}</h3>
            <p className="ml-4">${itemTotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-end text-xs font-medium mt-1 text-gray-500">
            <p className="ml-4">${item.product.price}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {item.quantity}</p>
        </div>
      </div>
    </li>
  );
});

export default CartItemSummaryCard;
