import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const calculateLevel = (views: number, water: number) => {
  let xp = views * 10 + water * 30;
  let level = 0;
  let xpRequired = 10;

  while (xp >= xpRequired) {
    level++;
    xp -= xpRequired;
    xpRequired *= 2;
  }

  return { level, xpRequired, xp };
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

  const {level, xpRequired, xp} = calculateLevel(tree.views, tree.water); // Calculate level

  return NextResponse.json({ ...tree, xp, level, xpRequired });
}
