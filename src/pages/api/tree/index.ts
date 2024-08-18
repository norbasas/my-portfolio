import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tree = await prisma.tree.findFirst();
    if (tree) {
      const xp = calculateXP(tree.views, tree.water); // Calculate XP
      const level = calculateLevel(xp); // Calculate level
      res.json({ ...tree, xp, level });
    } else {
      res.status(404).json({ message: 'Tree not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}