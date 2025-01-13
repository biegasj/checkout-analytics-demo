export interface ShippingMethod {
  id: string;
  label: string;
  cost: number;
}

export const SHIPPING_METHODS: ShippingMethod[] = [
  { id: "dhl", label: "DHL", cost: 5.0 },
  { id: "fedex", label: "FedEx", cost: 7.0 },
  { id: "inpost", label: "InPost", cost: 3.0 },
];
