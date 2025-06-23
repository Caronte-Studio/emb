/*
  Warnings:

  - You are about to drop the column `tipo` on the `Usuario` table. All the data in the column will be lost.
  - The `rol` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('Superadmin', 'Responsable', 'Operario', 'Cliente');

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "tipo",
ADD COLUMN     "telefono" TEXT,
DROP COLUMN "rol",
ADD COLUMN     "rol" "RolUsuario" NOT NULL DEFAULT 'Cliente';
