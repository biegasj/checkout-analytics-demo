import prisma from "../../prisma/client";

export function getAllProducts() {
  return prisma.product.findMany();
}
