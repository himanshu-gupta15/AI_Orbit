import { toolRepository, ToolRepository } from "@/repositories/tool.repository";
import { favoriteRepository, FavoriteRepository } from "@/repositories/favorite.repository";
import { ToolQueryInput } from "@/lib/validations/tool.validation";
import { Tool as PrismaTool, Prisma } from "@prisma/client";
import { Tool, ToolsResponse, CategoryItem } from "@/types/tool";

export class ToolService {
  constructor(
    private toolRepo: ToolRepository = toolRepository,
    private favoriteRepo: FavoriteRepository = favoriteRepository
  ) {}

  public parseTool(tool: PrismaTool, isFavorited = false): Tool {
    return {
      ...tool,
      logo: tool.logoUrl, // Compatibility with existing frontend
      platforms: this.safeJsonParse<string[]>(tool.platforms, []),
      features: this.safeJsonParse<string[]>(tool.features, []),
      useCases: this.safeJsonParse<string[]>(tool.useCases, []),
      tags: this.safeJsonParse<string[]>(tool.tags, []),
      pricingPlans: this.safeJsonParse<Array<{ tier: string; price: string; description: string }>>(
        tool.pricingPlans,
        []
      ),
      featured: tool.isFeatured,
      verified: tool.isVerified,
      ...(isFavorited !== undefined ? { isFavorited } : {}),
    } as Tool;
  }

  private safeJsonParse<T>(val: string, fallback: T): T {
    try {
      return JSON.parse(val);
    } catch {
      return fallback;
    }
  }

  async getTools(query: ToolQueryInput): Promise<ToolsResponse> {
    const { search, category, pricing, platform, sort, page, limit } = query;

    const where: Prisma.ToolWhereInput = {};

    const KNOWN_CATEGORIES = [
      "Productivity",
      "Writing",
      "Coding",
      "Design",
      "Image",
      "Video",
      "Audio",
      "Marketing",
      "Research",
      "Education",
      "Business",
      "Developer Tools",
    ];

    // Category filter with alias & case-insensitivity
    if (category && category.toLowerCase() !== "all") {
      const catLower = category.toLowerCase();
      if (catLower === "developer" || catLower === "developer tools") {
        where.OR = [
          { category: { equals: "Developer Tools", mode: "insensitive" } },
          { category: { equals: "Coding", mode: "insensitive" } },
        ];
      } else {
        const matched = KNOWN_CATEGORIES.find(
          (c) => c.toLowerCase() === catLower
        );
        where.category = {
          equals: matched || category,
          mode: "insensitive",
        };
      }
    }

    // Pricing filter
    if (pricing && pricing.toLowerCase() !== "all") {
      where.pricing = {
        equals: pricing,
        mode: "insensitive",
      };
    }

    // Platform filter
    if (platform && platform.toLowerCase() !== "all") {
      where.platforms = {
        contains: platform,
        mode: "insensitive",
      };
    }

    // Search filter across name, tagline, description, category, tags
    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { tagline: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { category: { contains: q, mode: "insensitive" } },
        { tags: { contains: q, mode: "insensitive" } },
      ];
    }

    // Sorting
    let orderBy: Prisma.ToolOrderByWithRelationInput = { reviewCount: "desc" };
    switch (sort) {
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "rating":
        orderBy = { rating: "desc" };
        break;
      case "a-z":
        orderBy = { name: "asc" };
        break;
      case "popular":
      default:
        orderBy = { reviewCount: "desc" };
        break;
    }

    const skip = (page - 1) * limit;
    const [total, tools] = await Promise.all([
      this.toolRepo.count(where),
      this.toolRepo.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: tools.map((t) => this.parseTool(t)),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    };
  }

  async getToolBySlug(slug: string, currentUserId?: string): Promise<Tool | null> {
    const tool = await this.toolRepo.findBySlug(slug);
    if (!tool) return null;

    let isFavorited = false;
    if (currentUserId) {
      isFavorited = await this.favoriteRepo.isToolFavoritedByUser(
        currentUserId,
        tool.id
      );
    }

    return this.parseTool(tool, isFavorited);
  }

  async getCategories(): Promise<CategoryItem[]> {
    return this.toolRepo.getCategoriesWithCounts();
  }

  async getRelatedTools(slug: string): Promise<Tool[]> {
    const current = await this.toolRepo.findBySlug(slug);
    if (!current) return [];

    const related = await this.toolRepo.findRelated({
      category: current.category,
      excludeSlug: current.slug,
      limit: 6,
    });

    return related.map((t) => this.parseTool(t));
  }
}

export const toolService = new ToolService();
