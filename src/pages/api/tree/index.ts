import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tree = await prisma.tree.findFirst();
    if (tree) {
      const height = tree.views * 0.0015;
      const width = tree.views * 0.002;
      const growth = tree.water * 0.001;
      res.json({ ...tree, height, width, growth });
    } else {
      res.status(404).json({ message: 'Tree not found' });
    }
  } else if (req.method === 'POST') {
    const { water, views } = req.body;
    if (water == null || views == null) {
      return res.status(400).json({ message: 'Water and views are required' });
    }
  
    // Ensure water and views are numbers
    const waterNumber = Number(water);
    const viewsNumber = Number(views);
  
    if (isNaN(waterNumber) || isNaN(viewsNumber)) {
      return res.status(400).json({ message: 'Water and views must be numbers' });
    }
    
    const tree = await prisma.tree.create({
      data: { water: waterNumber, views: viewsNumber },
    });

     // Calculate height, width, and growth
     const height = viewsNumber * 0.0015;
     const width = viewsNumber * 0.002;
     const growth = waterNumber * 0.001;
    
    res.status(201).json({ ...tree, height, width, growth });
  } else if (req.method === 'PUT') {
    const { id, water, views } = req.body;
    if (id == null || water == null || views == null) {
      return res.status(400).json({ message: 'ID, water, and views are required' });
    }
  
    // Ensure id, water, and views are numbers
    const idNumber = String(id);
    const waterNumber = Number(water);
    const viewsNumber = Number(views);
  
    if (isNaN(waterNumber) || isNaN(viewsNumber)) {
      return res.status(400).json({ message: 'Water and views must be numbers' });
    }
  
    const tree = await prisma.tree.update({
      where: { id: idNumber },
      data: { water: waterNumber, views: viewsNumber },
    });

         // Calculate height, width, and growth
         const height = viewsNumber * 0.0015;
         const width = viewsNumber * 0.002;
         const growth = waterNumber * 0.001;
  
    res.status(200).json({ ...tree, height, width, growth });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}