export interface ProductReview {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  date: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  startupId: string;
  startupName: string;
  name: string;
  description: string;
  tagline: string;
  category: "Software" | "Hardware" | "Subscription" | "Service";
  basePrice: number;
  currency: string;
  images: string[];
  features: string[];
  variants: ProductVariant[];
  reviews: ProductReview[];
  averageRating: number;
  totalSales: number;
}
