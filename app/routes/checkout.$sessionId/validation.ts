export const validateAddressForm = (formData: FormData) => {
  const errors: Record<string, string> = {};

  const requiredFields = {
    firstName: "First name is required",
    lastName: "Last name is required",
    streetAddress: "Street address is required",
    city: "City address is required",
    stateProvince: "State/Province is required",
    postalCode: "ZIP/Postal Code is required",
  };

  for (const [field, errorMessage] of Object.entries(requiredFields)) {
    const value = String(formData.get(field) || "").trim();
    if (!value) {
      errors[field] = errorMessage;
    }
  }

  return Object.keys(errors).length ? errors : null;
};
