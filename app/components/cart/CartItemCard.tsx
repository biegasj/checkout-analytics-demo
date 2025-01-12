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

    const itemTotal = item.product.price * item.quantity;

    const handleIncrement = () => setCartCount((prev) => prev + 1);
    const handleDecrement = () => setCartCount((prev) => prev - 1);

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
            <p>${itemTotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-end text-xs font-medium mt-1 text-gray-500">
            <p>${item.product.price.toFixed(2)}</p>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="flex items-center gap-2">
              <fetcher.Form method="post">
                <input type="hidden" name="cartId" value={cartId} />
                <input type="hidden" name="productId" value={item.productId} />
                <input
                  type="hidden"
                  name="quantity"
                  value={item.quantity - 1}
                />
                <button
                  type="submit"
                  name="_action"
                  value="updateCartItemQuantity"
                  className="text-blue-600 hover:text-blue-500 px-2 py-1 border rounded"
                  disabled={!isIdle || item.quantity <= 1}
                  onClick={handleDecrement}
                >
                  -
                </button>
              </fetcher.Form>
              <p className="text-gray-500">{item.quantity}</p>
              <fetcher.Form method="post">
                <input type="hidden" name="cartId" value={cartId} />
                <input type="hidden" name="productId" value={item.productId} />
                <input
                  type="hidden"
                  name="quantity"
                  value={item.quantity + 1}
                />
                <button
                  type="submit"
                  name="_action"
                  value="updateCartItemQuantity"
                  className="text-blue-600 hover:text-blue-500 px-2 py-1 border rounded"
                  disabled={!isIdle}
                  onClick={handleIncrement}
                >
                  +
                </button>
              </fetcher.Form>
            </div>
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
