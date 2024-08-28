import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = (global as any).prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") (global as any).prisma = prisma;


const calculateLevel = (views: number, water: number) => {
  let xp = views * 15 + water * 30;
  let level = 0;
  let xpRequired = 10;

  while (xp >= xpRequired) {
    level++;
    xp -= xpRequired;
    xpRequired *= 1.2;
  }

  return { level, xpRequired, xp };
};

export async function GET() {
  try {
    let tree = await prisma.tree.findFirst();
    if (!tree) {
      tree = await prisma.tree.create({
        data: {
          views: 0,
          water: 0,
        },
      });
    }

    const { level, xpRequired, xp } = calculateLevel(tree.views, tree.water);

    return NextResponse.json(
      { ...tree, xp, level, xpRequired },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Error fetching tree data:", error);
    return NextResponse.json({ error: "Failed to fetch tree data" }, { status: 500 });
  }
}
