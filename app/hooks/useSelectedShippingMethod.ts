import { useMemo } from "react";
import { SHIPPING_METHODS, ShippingMethod } from "~/utils/shippingMethods";

export function useSelectedShippingMethod(shippingMethodId: string) {
  return useMemo(() => {
    return SHIPPING_METHODS.find(
      (method: ShippingMethod) => method.id === shippingMethodId
    );
  }, [shippingMethodId]);
}
