import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to calculate XP
const calculateXP = (views: number, water: number): number => {
  // Example calculation logic
  return views * 10 + water * 5;
};

// Function to calculate level based on XP
const calculateLevel = (xp: number): number => {
  let level = 0;
  let xpRequired = 1000;

  while (xp >= xpRequired) {
    level++;
    xp -= xpRequired;
    xpRequired *= 2;
  }

  return level;
};

export async function GET() {
  let tree = await prisma.tree.findFirst();
  if (!tree) {
    tree = await prisma.tree.create({
      data: {
        views: 0,
        water: 0,
      },
    });
  }

  const xp = calculateXP(tree.views, tree.water); // Calculate XP
  const level = calculateLevel(xp); // Calculate level

  return NextResponse.json({ ...tree, xp, level });
}
