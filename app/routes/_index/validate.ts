export const validateProductIdAndQuantity = (
  productId: number,
  quantity: number
) => {
  const isValidProductId = !isNaN(productId) && productId > 0;
  const isValidQuantity = !isNaN(quantity) && quantity > 0;

  if (!isValidProductId || !isValidQuantity) {
    throw new Response("Invalid input parameters", {
      status: 400,
    });
  }
};
