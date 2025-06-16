/*
  Warnings:

  - Added the required column `fechaFin` to the `Proyecto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaInicio` to the `Proyecto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Proyecto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoProyecto" AS ENUM ('en_curso', 'completado', 'pendiente');

-- AlterTable
ALTER TABLE "Proyecto" ADD COLUMN     "estado" "EstadoProyecto" NOT NULL DEFAULT 'en_curso',
ADD COLUMN     "fechaFin" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fechaInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "progreso" INTEGER NOT NULL DEFAULT 0;
