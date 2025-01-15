import { AddressDetails } from "~/types/addressDetails";
import { PAYMENT_METHODS, PaymentMethod } from "~/utils/paymentMethods";
import { SHIPPING_METHODS, ShippingMethod } from "~/utils/shippingMethods";

export const validateAddressForm = (formData: FormData) => {
  const errors: Record<string, string> = {};

  const requiredFields: Record<string, string> = {
    email: "E-mail address is required",
    firstName: "First name is required",
    lastName: "Last name is required",
    street: "Street is required",
    city: "City is required",
    province: "State/Province is required",
    zipCode: "ZIP/Postal Code is required",
  };

  Object.entries(requiredFields).forEach(([field, errorMessage]) => {
    const value = formData.get(field)?.toString().trim();
    if (!value) {
      errors[field] = errorMessage;
    }
  });

  return Object.keys(errors).length ? errors : null;
};

export const extractAddressDetails = (formData: FormData): AddressDetails => {
  const street = formData.get("street")?.toString().trim() || "";
  const city = formData.get("city")?.toString().trim() || "";
  const province = formData.get("province")?.toString().trim() || "";
  const zipCode = formData.get("zipCode")?.toString().trim() || "";
  const country = formData.get("country")?.toString().trim() || "";

  const address = `${street}, ${city}, ${province}, ${zipCode}, ${country}`;

  const shippingMethod = SHIPPING_METHODS.find(
    (method: ShippingMethod) =>
      method.id === formData.get("shippingMethodId")?.toString().trim() || ""
  );

  const paymentMethod = PAYMENT_METHODS.find(
    (method: PaymentMethod) =>
      method.id === formData.get("paymentMethodId")?.toString().trim() || ""
  );

  return {
    email: formData.get("email")?.toString().trim() || "",
    firstName: formData.get("firstName")?.toString().trim() || "",
    lastName: formData.get("lastName")?.toString().trim() || "",
    address: address,
    shippingMethod: shippingMethod?.label || "",
    paymentMethod: paymentMethod?.label || "",
    shippingPrice: Number(formData.get("shippingPrice")) || 0,
  };
};
