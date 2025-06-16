-- CreateTable
CREATE TABLE "Usuario" (
    "id_user" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "foto_url" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id_empresa" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id_empresa")
);

-- CreateTable
CREATE TABLE "UsuEmp" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "UsuEmp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proyecto" (
    "id_proy" SERIAL NOT NULL,
    "id_empresa" INTEGER NOT NULL,

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id_proy")
);

-- CreateTable
CREATE TABLE "ProyUsu" (
    "id" SERIAL NOT NULL,
    "id_proy" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "ProyUsu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fase" (
    "id_fase" SERIAL NOT NULL,
    "id_proy" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Fase_pkey" PRIMARY KEY ("id_fase")
);

-- CreateTable
CREATE TABLE "Checkpoint" (
    "id_check" SERIAL NOT NULL,
    "id_fase" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Checkpoint_pkey" PRIMARY KEY ("id_check")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id_doc" SERIAL NOT NULL,
    "url_archivo" TEXT NOT NULL,
    "id_check" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "id_carpeta" INTEGER NOT NULL,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id_doc")
);

-- CreateTable
CREATE TABLE "Carpeta" (
    "id_carpeta" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,

    CONSTRAINT "Carpeta_pkey" PRIMARY KEY ("id_carpeta")
);

-- CreateTable
CREATE TABLE "Factura" (
    "id_fact" SERIAL NOT NULL,
    "url_archivo" TEXT NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "importe" DOUBLE PRECISION NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("id_fact")
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id_not" SERIAL NOT NULL,
    "id_proy" INTEGER NOT NULL,
    "id_empresa" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,
    "tags" TEXT,

    CONSTRAINT "Notificacion_pkey" PRIMARY KEY ("id_not")
);

-- CreateTable
CREATE TABLE "NotUsu" (
    "id" SERIAL NOT NULL,
    "id_not" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "visto" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "NotUsu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UsuEmp_id_user_id_empresa_key" ON "UsuEmp"("id_user", "id_empresa");

-- CreateIndex
CREATE UNIQUE INDEX "ProyUsu_id_proy_id_user_key" ON "ProyUsu"("id_proy", "id_user");

-- CreateIndex
CREATE UNIQUE INDEX "NotUsu_id_not_id_user_key" ON "NotUsu"("id_not", "id_user");

-- AddForeignKey
ALTER TABLE "UsuEmp" ADD CONSTRAINT "UsuEmp_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Usuario"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuEmp" ADD CONSTRAINT "UsuEmp_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyUsu" ADD CONSTRAINT "ProyUsu_id_proy_fkey" FOREIGN KEY ("id_proy") REFERENCES "Proyecto"("id_proy") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyUsu" ADD CONSTRAINT "ProyUsu_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Usuario"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fase" ADD CONSTRAINT "Fase_id_proy_fkey" FOREIGN KEY ("id_proy") REFERENCES "Proyecto"("id_proy") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkpoint" ADD CONSTRAINT "Checkpoint_id_fase_fkey" FOREIGN KEY ("id_fase") REFERENCES "Fase"("id_fase") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_id_check_fkey" FOREIGN KEY ("id_check") REFERENCES "Checkpoint"("id_check") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_id_carpeta_fkey" FOREIGN KEY ("id_carpeta") REFERENCES "Carpeta"("id_carpeta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_id_proy_fkey" FOREIGN KEY ("id_proy") REFERENCES "Proyecto"("id_proy") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacion" ADD CONSTRAINT "Notificacion_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa"("id_empresa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotUsu" ADD CONSTRAINT "NotUsu_id_not_fkey" FOREIGN KEY ("id_not") REFERENCES "Notificacion"("id_not") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotUsu" ADD CONSTRAINT "NotUsu_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Usuario"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
