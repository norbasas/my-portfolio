"use server";
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

export const fetchTreeData = async () => {
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

    return { ...tree, xp, level, xpRequired };
  } catch (error) {
    console.error("Error fetching tree data:", error);
    throw new Error("Failed to fetch tree data");
  }
};
