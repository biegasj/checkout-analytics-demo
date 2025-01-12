import { CartItem, Product } from "@prisma/client";
import { memo } from "react";
import { useFetcher } from "@remix-run/react";

interface CartItemCardProps {
  cartId: number;
  item: CartItem & {
    product: Product;
  };
  cartCount: number;
  setCartCount: (value: ((prevState: number) => number) | number) => void;
}

const CartItemCard = memo(
  ({ cartId, item, cartCount, setCartCount }: CartItemCardProps) => {
    const fetcher = useFetcher();
    const isIdle = fetcher.state === "idle";

    return (
      <li
        className={`flex py-6 ${
          isIdle ? "" : "opacity-50 pointer-events-none"
        }`}
      >
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
            <fetcher.Form method="post">
              <input type="hidden" name="cartId" value={cartId} />
              <input type="hidden" name="productId" value={item.productId} />
              <button
                className="font-medium text-blue-600 hover:text-blue-500"
                type="submit"
                name="_action"
                value="removeFromCart"
                onClick={() => setCartCount(cartCount - item.quantity)}
              >
                Remove
              </button>
            </fetcher.Form>
          </div>
        </div>
      </li>
    );
  }
);

export default CartItemCard;
