export interface PricingPlan {
  tier: string;
  price: string;
  description: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  logo: string;
  websiteUrl: string;
  category: string;
  pricing: "Free" | "Freemium" | "Paid" | string;
  rating: number;
  reviewCount: number;
  platforms: string[];
  features: string[];
  useCases: string[];
  tags: string[];
  pricingPlans: PricingPlan[];
  featured: boolean;
  verified: boolean;
  isFavorited?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ToolsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ToolsResponse {
  data: Tool[];
  pagination: ToolsPagination;
}

export interface CategoryItem {
  name: string;
  count: number;
}
