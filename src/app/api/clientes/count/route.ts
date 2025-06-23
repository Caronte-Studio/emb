import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
import RolUsuario from '@prisma/client';

export async function GET() {
  try {
    // Contar total de clientes (usuarios con rol Cliente)
    const totalClientes = await prisma.usuario.count({
      where: {
        rol: 'Cliente',
        activo: true
      }
    });

    // Calcular fecha de hace un mes
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Contar clientes nuevos en el último mes
    const lastMonthCount = await prisma.usuario.count({
      where: {
        rol: 'Cliente',
        activo: true,
        fecha_creacion: {
          gte: oneMonthAgo
        }
      }
    });

    return NextResponse.json({
      total: totalClientes,
      lastMonthCount
    });
  } catch (error) {
    console.error('Error fetching client counts:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}