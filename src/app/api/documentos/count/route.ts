import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET() {
  try {
    // Obtener conteo total de documentos
    const totalDocuments = await prisma.documento.count();

    // Calcular fecha de hace un mes
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Conteo de documentos creados en el último mes
    const lastMonthCount = await prisma.documento.count({
      where: {
        createdAt: {
          gte: oneMonthAgo
        }
      }
    });

    return NextResponse.json({
      total: totalDocuments,
      lastMonthCount
    });
  } catch (error) {
    console.error('Error fetching document counts:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}