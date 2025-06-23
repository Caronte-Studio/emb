// app/api/facturas/count/route.ts
import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET() {
  try {
    const totalFacturas = await prisma.factura.count();
    
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const lastMonthCount = await prisma.factura.count({
      where: {
        createdAt: {
          gte: oneMonthAgo
        }
      }
    });

    return NextResponse.json({
      total: totalFacturas,
      lastMonthCount
    });
  } catch (error) {
    console.error('Error fetching factura counts:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}