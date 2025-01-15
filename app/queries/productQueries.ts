import prisma from "../../prisma/client";

export function getAllProducts() {
  return prisma.product.findMany();
}

export function getProductPriceById(id: number) {
  return prisma.product.findUnique({ where: { id }, select: { price: true } });
}
