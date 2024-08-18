import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  const tree = await prisma.tree.findFirst();
  if (tree) {
    const updatedTree = await prisma.tree.update({
      where: { id: tree.id },
      data: { views: tree.views + 1 },
    });
    return NextResponse.json(updatedTree);
  } else {
    return NextResponse.json({ message: 'Tree not found' }, { status: 404 });
  }
}