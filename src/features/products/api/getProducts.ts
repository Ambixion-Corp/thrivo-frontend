import { Product } from "../types";

// Mock data for the consumer storefront
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    startupId: "start-1",
    startupName: "Lumina",
    name: "Lumina Desk Studio",
    tagline: "The world's first smart desk with an integrated OLED display.",
    description:
      "Transform your workspace with a desk that acts as your command center. Features an edge-to-edge tempered glass surface with a built-in interactive display, wireless charging, and cable management system.",
    category: "Hardware",
    basePrice: 1499.0,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
    ],
    features: [
      "24-inch Integrated OLED Display",
      "Qi Wireless Fast Charging",
      "Motorized Height Adjustment",
      "Hidden Cable Management Vault",
    ],
    variants: [
      {
        id: "var-1a",
        name: "Matte Black (Standard)",
        price: 1499.0,
        inStock: true,
      },
      { id: "var-1b", name: "Walnut Wood (Pro)", price: 1699.0, inStock: true },
    ],
    reviews: [
      {
        id: "rev-1",
        authorName: "TechCrunch",
        rating: 5,
        text: "The Lumina desk feels like something pulled straight out of a sci-fi movie. The build quality is exceptional.",
        date: "2024-03-15",
      },
    ],
    averageRating: 4.8,
    totalSales: 2450,
  },
  {
    id: "prod-2",
    startupId: "start-2",
    startupName: "Opal",
    name: "Opal C1 Webcam",
    tagline: "DSLR quality in a remarkably small package.",
    description:
      "The Opal C1 is a professional-grade webcam built for modern remote work. Powered by a neural engine processing unit, it delivers unprecedented clarity, depth of field, and color accuracy.",
    category: "Hardware",
    basePrice: 299.0,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?w=800&q=80",
      "https://images.unsplash.com/photo-1622325996024-cd9d5bd29df4?w=800&q=80",
    ],
    features: [
      "Sony IMX378 Sensor",
      "f/1.8 Six-Element Lens",
      "Omnidirectional Mic Array",
      "Neural Engine ISP",
    ],
    variants: [
      { id: "var-2a", name: "Space Grey", price: 299.0, inStock: true },
      { id: "var-2b", name: "Silver", price: 299.0, inStock: false },
    ],
    reviews: [
      {
        id: "rev-2",
        authorName: "MKBHD",
        rating: 4.5,
        text: "Finally, a webcam that actually looks good without a massive lighting setup.",
        date: "2024-05-10",
      },
    ],
    averageRating: 4.5,
    totalSales: 15300,
  },
  {
    id: "prod-3",
    startupId: "start-3",
    startupName: "Superhuman",
    name: "Superhuman Pro Annual",
    tagline: "The fastest email experience ever made.",
    description:
      "Get through your inbox twice as fast. Superhuman is rebuilt from the ground up to be blazingly fast, visually stunning, and entirely keyboard-driven.",
    category: "Software",
    basePrice: 360.0,
    currency: "USD",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    ],
    features: [
      "Sub-100ms Response Times",
      "AI-Powered Triage",
      "Undo Send & Read Statuses",
      "Full Keyboard Navigation",
    ],
    variants: [
      { id: "var-3a", name: "Annual Plan", price: 360.0, inStock: true },
    ],
    reviews: [],
    averageRating: 4.9,
    totalSales: 45000,
  },
];

export async function getAllProducts(): Promise<Product[]> {
  // Simulate network delay
  return MOCK_PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | null> {
  return MOCK_PRODUCTS.find((p) => p.id === id) || null;
}
