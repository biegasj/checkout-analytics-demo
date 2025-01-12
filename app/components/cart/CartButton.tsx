import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface CartButtonProps {
  cartCount: number;
  cartOpen: boolean;
  setCartOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

const CartButton = ({ cartCount, cartOpen, setCartOpen }: CartButtonProps) => {
  return (
    <div className="relative">
      <button
        type="button"
        className="bg-black hover:bg-gray-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        aria-label="Shopping Cart"
        onClick={() => setCartOpen(!cartOpen)}
      >
        <ShoppingCartIcon className="h-8 w-8 text-gray-700" stroke="white" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartButton;
