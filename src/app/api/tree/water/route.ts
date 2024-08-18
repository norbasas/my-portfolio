import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.error();
  }

  const tree = await prisma.tree.findFirst();
  if (tree) {
    const updatedTree = await prisma.tree.update({
      where: { id: tree.id },
      data: { water: tree.water + 1 },
    });
    return NextResponse.json(updatedTree);
  } else {
    return NextResponse.json({ message: 'Tree not found' }, { status: 404 });
  }
}