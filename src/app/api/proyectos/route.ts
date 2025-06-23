// src/app/api/proyectos/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const proyectos = await prisma.proyecto.findMany({
      include: {
        empresa: true,
        usuarios: {
          include: {
            usuario: true
          }
        },
        fases: true,
        notificaciones: true
      }
    })

    const proyectosFormateados = proyectos.map(p => ({
      id: p.id_proy.toString(),
      nombre: p.fases[0]?.nombre ?? 'Sin nombre',
      fechaInicio: '2023-01-01', // debes añadir estos campos en el modelo si los quieres reales
      fechaFin: '2023-12-31',
      progreso: 0, // calcula desde fases/checkpoints si hace falta
      estado: 'en_curso', // calcula según estado de checkpoints
      responsable: p.usuarios[0]?.usuario.nombre + ' ' + p.usuarios[0]?.usuario.apellidos
    }))

    return NextResponse.json(proyectosFormateados)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error al obtener proyectos' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      id_empresa,
      nombre,
      fechaInicio,
      fechaFin,
      estado,
      progreso,
    } = body

    if (!id_empresa || !nombre || !fechaInicio || !fechaFin || !estado) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    const nuevoProyecto = await prisma.proyecto.create({
      data: {
        id_empresa: parseInt(id_empresa),
        nombre,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin),
        estado,
        progreso,
      },
    })

    return NextResponse.json(nuevoProyecto, { status: 201 })
  } catch (error) {
    console.error('Error creando proyecto:', error)
    return NextResponse.json({ error: 'Error al crear proyecto' }, { status: 500 })
  }
}
