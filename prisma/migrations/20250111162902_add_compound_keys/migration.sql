/*
  Warnings:

  - The primary key for the `CartItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CartItem` table. All the data in the column will be lost.
  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrderItem` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CartItem_cartId_productId_key";

-- AlterTable
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY ("cartId", "productId");

-- AlterTable
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("orderId", "productId");
