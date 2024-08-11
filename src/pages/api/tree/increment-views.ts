import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const tree = await prisma.tree.findFirst();
    if (tree) {
      const updatedTree = await prisma.tree.update({
        where: { id: tree.id },
        data: { views: tree.views + 1 },
      });
      res.json(updatedTree);
    } else {
      res.status(404).json({ message: 'Tree not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}