import prisma from "./client";

async function main() {
  const product_laptop = await prisma.product.upsert({
    where: { id: 1 },
    update: { quantity: 50 },
    create: {
      name: "Laptop",
      price: 1299.99,
      imageUrl: "https://images.unsplash.com/photo-1484788984921-03950022c9ef",
      imageAlt: "A laptop",
      quantity: 50,
    },
  });

  const product_smartphone = await prisma.product.upsert({
    where: { id: 2 },
    update: { quantity: 75 },
    create: {
      id: 2,
      name: "Smartphone",
      price: 299.99,
      imageUrl: "https://images.unsplash.com/photo-1530563885674-66db50a1af19",
      imageAlt: "A smartphone",
      quantity: 75,
    },
  });

  const product_tablet = await prisma.product.upsert({
    where: {
      id: 3,
    },
    update: { quantity: 30 },
    create: {
      id: 3,
      name: "Tablet",
      price: 499.99,
      imageUrl: "https://images.unsplash.com/photo-1471279136892-55af5dc6895f",
      imageAlt: "A tablet",
      quantity: 30,
    },
  });

  const cart = await prisma.cart.upsert({
    where: { sessionId: "unique-session-id-abc123" },
    update: {},
    create: {
      sessionId: "unique-session-id-abc123",
    },
  });

  await prisma.cartItem.upsert({
    where: {
      cartItemId: {
        cartId: cart.id,
        productId: product_laptop.id,
      },
    },
    update: {
      quantity: 1,
    },
    create: {
      cartId: cart.id,
      productId: product_laptop.id,
      priceAtPurchase: 199.0,
      quantity: 1,
    },
  });

  await prisma.cartItem.upsert({
    where: {
      cartItemId: {
        cartId: cart.id,
        productId: product_smartphone.id,
      },
    },
    update: {
      quantity: 2,
    },
    create: {
      cartId: cart.id,
      productId: product_smartphone.id,
      quantity: 2,
      priceAtPurchase: 199.0,
    },
  });

  const order = await prisma.order.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      cartId: cart.id,
      email: "john.doe@gmail.com",
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St, New York, NY",
      shippingMethod: "Standard",
      paymentMethod: "Credit Card",
      shippingPrice: 5.0,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
