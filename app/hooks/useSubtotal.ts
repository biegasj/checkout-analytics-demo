import { Cart, CartItem, Product } from "@prisma/client";
import { useMemo } from "react";

export function useSubtotal(
  cart: Cart & { items: (CartItem & { product: Product })[] }
) {
  return useMemo(() => {
    return (
      cart?.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ) || 0
    );
  }, [cart.items]);
}
