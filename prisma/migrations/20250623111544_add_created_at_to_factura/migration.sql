/*
  Warnings:

  - You are about to drop the `Factura` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Factura" DROP CONSTRAINT "Factura_id_empresa_fkey";

-- DropTable
DROP TABLE "Factura";

-- CreateTable
CREATE TABLE "facturas" (
    "id_fact" SERIAL NOT NULL,
    "url_archivo" TEXT NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "importe" DOUBLE PRECISION NOT NULL,
    "estado" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id_fact")
);

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;
