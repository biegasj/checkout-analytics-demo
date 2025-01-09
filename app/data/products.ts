export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
  href: string;
  quantity: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1484788984921-03950022c9ef",
    imageAlt: "",
    href: "#",
    quantity: 1,
  },
  {
    id: 2,
    name: "Smartphone",
    price: 299,
    imageUrl: "https://images.unsplash.com/photo-1530563885674-66db50a1af19",
    imageAlt: "",
    href: "#",
    quantity: 1,
  },
  {
    id: 3,
    name: "Tablet",
    price: 499,
    imageUrl: "https://images.unsplash.com/photo-1471279136892-55af5dc6895f",
    imageAlt: "",
    href: "#",
    quantity: 1,
  },
];
