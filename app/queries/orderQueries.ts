import prisma from "../../prisma/client";
import { AddressDetails } from "~/types/addressDetails";

export async function getOrderWithRelated(cartId: number) {
  return prisma.order.findUnique({
    where: { cartId },
    include: { cart: { include: { items: { include: { product: true } } } } },
  });
}

export async function createOrder(
  cartId: number,
  addressDetails: AddressDetails
) {
  return prisma.order.create({
    data: { cartId, ...addressDetails },
  });
}
