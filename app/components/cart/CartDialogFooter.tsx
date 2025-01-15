import { Link } from "@remix-run/react";
import { Cart, CartItem, Product } from "@prisma/client";

interface CartDialogFooterProps {
  subtotal: number;
  onClose: () => void;
  cart: Cart & { items: (CartItem & { product: Product })[] };
}

const CartDialogFooter = ({
  subtotal,
  onClose,
  cart,
}: CartDialogFooterProps) => {
  const isCheckoutDisabled = cart.items.length === 0;

  return (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>${subtotal.toFixed(2)}</p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">
        Shipping and taxes calculated at checkout.
      </p>
      <div className="mt-6">
        {isCheckoutDisabled ? (
          <div className="flex items-center justify-center rounded-md border border-transparent bg-gray-400 px-6 py-3 text-base font-medium text-white shadow-sm cursor-not-allowed">
            Checkout
          </div>
        ) : (
          <Link
            to={`/checkout/${cart.sessionId}`}
            className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Checkout
          </Link>
        )}
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          or{" "}
          <button
            type="button"
            onClick={onClose}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    </div>
  );
};

export default CartDialogFooter;
