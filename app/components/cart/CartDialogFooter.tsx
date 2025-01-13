import { Link } from "@remix-run/react";

interface CartDialogFooterProps {
  sessionId: string;
  subtotal: number;
  onClose: () => void;
}

const CartDialogFooter = ({
  sessionId,
  subtotal,
  onClose,
}: CartDialogFooterProps) => {
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
        <Link
          to={`/checkout/${sessionId}`}
          className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Checkout
        </Link>
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
