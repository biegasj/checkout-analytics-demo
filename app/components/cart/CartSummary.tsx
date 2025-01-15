import CheckoutItemCard from "../checkout/CheckoutItemCard";
import { Cart, CartItem, Product } from "@prisma/client";

interface CartSummaryProps {
  cart: Cart & {
    items: (CartItem & {
      product: Product;
    })[];
  };
  subtotal: any;
  shippingPrice: number;
}

export default function CartSummary({
  cart,
  subtotal,
  shippingPrice,
}: CartSummaryProps) {
  return (
    <div className="col-span-3">
      <div className="flow-root bg-gray-100 p-8 rounded-lg">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-8">
          Order summary
        </h2>
        <ul role="list" className="-my-6 divide-y divide-gray-300">
          {cart.items.map((item: CartItem & { product: Product }) => (
            <CheckoutItemCard key={item.productId} item={item} />
          ))}
        </ul>
        <div className="mt-8 space-y-4">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Shipping</p>
            <p>${shippingPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-4  border-t-2 border-t-gray-300">
            <p>Total</p>
            <p>${(subtotal + shippingPrice).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
