import prisma from "../../prisma/client";

export async function getCart(sessionId: string) {
  return prisma.cart.findUnique({ where: { sessionId } });
}

export async function getCartWithRelated(sessionId: string) {
  return prisma.cart.findUnique({
    where: { sessionId },
    include: {
      items: {
        include: { product: true },
        orderBy: { product: { id: "desc" } },
      },
    },
  });
}

export async function upsertCart(sessionId: string) {
  return prisma.cart.upsert({
    where: { sessionId },
    update: {},
    create: { sessionId },
  });
}

export async function upsertCartItem(
  cartId: number,
  productId: number,
  quantity: number
) {
  return prisma.cartItem.upsert({
    where: { cartItemId: { cartId, productId } },
    update: { quantity },
    create: { cartId, productId, quantity },
  });
}

export async function deleteCartItem(cartId: number, productId: number) {
  return prisma.cartItem.delete({
    where: { cartItemId: { cartId, productId } },
  });
}
