import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Cart, CartItem, Product } from "@prisma/client";
import CartItemCard from "~/components/cart/CartItemCard";
import CartDialogFooter from "~/components/cart/CartDialogFooter";

interface CartProps {
  cart: Cart & {
    items: (CartItem & {
      product: Product;
    })[];
  };
  open: boolean;
  setOpen: (open: boolean) => void;
  cartCount: number;
  setCartCount: (value: ((prevState: number) => number) | number) => void;
}

const CartDialog = ({
  cart,
  open,
  setOpen,
  cartCount,
  setCartCount,
}: CartProps) => {
  const subtotal = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="relative z-10"
      aria-labelledby="cart-dialog-title"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {cart.items.map((item) => (
                          <CartItemCard
                            key={item.product.id}
                            cartId={cart.id}
                            item={item}
                            cartCount={cartCount}
                            setCartCount={setCartCount}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <CartDialogFooter
                  cart={cart}
                  subtotal={subtotal}
                  onClose={() => setOpen(false)}
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CartDialog;
