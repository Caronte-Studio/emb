/*
  Warnings:

  - You are about to drop the `Documento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Documento" DROP CONSTRAINT "Documento_id_carpeta_fkey";

-- DropForeignKey
ALTER TABLE "Documento" DROP CONSTRAINT "Documento_id_check_fkey";

-- DropForeignKey
ALTER TABLE "Documento" DROP CONSTRAINT "Documento_id_empresa_fkey";

-- DropTable
DROP TABLE "Documento";

-- CreateTable
CREATE TABLE "documentos" (
    "id_doc" SERIAL NOT NULL,
    "url_archivo" TEXT NOT NULL,
    "id_check" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "id_carpeta" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documentos_pkey" PRIMARY KEY ("id_doc")
);

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_id_check_fkey" FOREIGN KEY ("id_check") REFERENCES "Checkpoint"("id_check") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_id_carpeta_fkey" FOREIGN KEY ("id_carpeta") REFERENCES "Carpeta"("id_carpeta") ON DELETE RESTRICT ON UPDATE CASCADE;
