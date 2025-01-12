import prisma from "../../prisma/client";

export async function getCart(sessionId: string) {
  return prisma.cart.findUnique({
    where: { sessionId },
    include: { items: { include: { product: true } } },
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
    update: { quantity: { increment: quantity } },
    create: { cartId, productId, quantity },
  });
}
