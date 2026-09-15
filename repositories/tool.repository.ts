import prisma from "@/lib/prisma";
import { Tool, Prisma } from "@prisma/client";

export class ToolRepository {
  async findMany(params?: {
    where?: Prisma.ToolWhereInput;
    orderBy?: Prisma.ToolOrderByWithRelationInput;
    skip?: number;
    take?: number;
    select?: Prisma.ToolSelect;
  }): Promise<any[]> {
    return prisma.tool.findMany(params as any);
  }

  async count(where?: Prisma.ToolWhereInput): Promise<number> {
    return prisma.tool.count(where ? { where } : undefined);
  }

  async findBySlug(slug: string): Promise<Tool | null> {
    return prisma.tool.findUnique({
      where: { slug: slug.toLowerCase() },
    });
  }

  async findById(id: string): Promise<Tool | null> {
    return prisma.tool.findUnique({
      where: { id },
    });
  }

  async findRelated(params: {
    category: string;
    excludeSlug: string;
    limit: number;
  }): Promise<Tool[]> {
    const { category, excludeSlug, limit } = params;

    // 1. Fetch in the same category
    let tools = await prisma.tool.findMany({
      where: {
        category,
        slug: { not: excludeSlug },
      },
      orderBy: { rating: "desc" },
      take: limit,
    });

    // 2. Supplement if fewer than requested
    if (tools.length < limit) {
      const existingSlugs = [excludeSlug, ...tools.map((t) => t.slug)];
      const additional = await prisma.tool.findMany({
        where: {
          slug: { notIn: existingSlugs },
        },
        orderBy: { rating: "desc" },
        take: limit - tools.length,
      });
      tools = [...tools, ...additional];
    }

    return tools;
  }

  async getCategoriesWithCounts(): Promise<Array<{ name: string; count: number }>> {
    const categoriesGrouped = await prisma.tool.groupBy({
      by: ["category"],
      _count: {
        id: true,
      },
      orderBy: {
        category: "asc",
      },
    });

    const totalCount = await prisma.tool.count();

    return [
      { name: "All", count: totalCount },
      ...categoriesGrouped.map((c) => ({
        name: c.category,
        count: c._count.id,
      })),
    ];
  }

  async create(data: Prisma.ToolCreateInput): Promise<Tool> {
    return prisma.tool.create({ data });
  }
}

export const toolRepository = new ToolRepository();
