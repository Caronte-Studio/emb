"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { useState } from "react";
import { LayoutDashboard, FileText, Users, Settings, LogOut, Building, BarChart3, FileIcon as FilePdf, BookOpen, Menu } from "lucide-react";

import logoEMB from "@/public/emb_logo.png";

interface SidebarProps {
  role: "cliente" | "operario" | "responsable" | "superadmin";
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Función para determinar si un enlace está activo
  const isActive = (path: string) => pathname === path;

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* Sidebar */}
      <div>
        <div className={`d-flex flex-column bg-white border-end position-sticked h-100 ${isCollapsed ? "d-none" : ""}`} style={{ width: "280px", zIndex: 1050 }}>
          {/* Header */}
          <div className="border-bottom px-4 py-3">
              {/* <Image className="logo" src={logoEMB} alt=""/> */}
          </div>
          {/* Content */}
          <div className="flex-grow-1 overflow-auto">
            {/* Navegación Principal */}
            <div className="p-3">
              <h6 className="text-muted text-uppercase fw-semibold mb-3" style={{ fontSize: "0.75rem" }}>
                Navegación
              </h6>
              <nav className="nav flex-column">
                <Link
                  href="/dashboard"
                  className={`nav-link d-flex align-items-center gap-2 py-2 px-3 rounded text-decoration-none ${
                    isActive("/dashboard") ? "bg-primary text-white" : "text-dark"
                  }`}
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/documentos"
                  className={`nav-link d-flex align-items-center gap-2 py-2 px-3 rounded text-decoration-none ${
                    isActive("/documentos") ? "bg-primary text-white" : "text-dark"
                  }`}
                >
                  <FileText size={20} />
                  <span>Documentos</span>
                </Link>
                <Link
                  href="/facturas"
                  className={`nav-link d-flex align-items-center gap-2 py-2 px-3 rounded text-decoration-none ${
                    isActive("/facturas") ? "bg-primary text-white" : "text-dark"
                  }`}
                >
                  <FileText size={20} />
                  <span>Facturas</span>
                </Link>
                
                <Link
                  href="/proyectos"
                  className={`nav-link d-flex align-items-center gap-2 py-2 px-3 rounded text-decoration-none ${
                    isActive("/proyectos") ? "bg-primary text-white" : "text-dark"
                  }`}
                >
                  <BarChart3 size={20} />
                  <span>Proyectos</span>
                </Link>
                <Link
                  href="/plantillas"
                  className={`nav-link d-flex align-items-center gap-2 py-2 px-3 rounded text-decoration-none ${
                    isActive("/plantillas") ? "bg-primary text-white" : "text-dark"
                  }`}
                >
                  <FileText size={20} />
                  <span>Plantillas</span>
                </Link>
                <Link
                  href="/clientes"
                  className={`nav-link d-flex align-items-center gap-2 py-2 px-3 rounded text-decoration-none ${
                    isActive("/clientes") ? "bg-primary text-white" : "text-dark"
                  }`}
                >
                  <Users size={20} />
                  <span>Clientes</span>
                </Link>
              </nav>
            </div>
            {/* Documentación Corporativa - Solo para operarios */}
            {role === "operario" && (
              <div className="p-3">
                <h6 className="text-muted text-uppercase fw-semibold mb-3" style={{ fontSize: "0.75rem" }}>
                  Documentación Corporativa
                </h6>
                <nav className="nav flex-column">
                  <Link
                    href="/corporativo"
                    className={`nav-link d-flex align-items-center gap-2 py-2 px-3 rounded text-decoration-none ${
                      isActive("/corporativo") ? "bg-primary text-white" : "text-dark"
                    }`}
                  >
                    <BookOpen size={20} />
                    <span>Documentos Corporativos</span>
                  </Link>
                </nav>
              </div>
            )}
            {/* Administración - Para responsables y superadmin */}
            {(role === "responsable" || role === "superadmin") && (
              <div className="p-3">
                <h6 className="text-muted text-uppercase fw-semibold mb-3" style={{ fontSize: "0.75rem" }}>
                  Administración
                </h6>
                <nav className="nav flex-column">
                  <Link
                    href="/usuarios"
                    className={`nav-link d-flex align-items-center gap-2 py-2 px-3 rounded text-decoration-none ${
                      isActive("/usuarios") ? "bg-primary text-white" : "text-dark"
                    }`}
                  >
                    <Users size={20} />
                    <span>Usuarios</span>
                  </Link>
                  {role === "superadmin" && (
                    <Link
                      href="/empresas"
                      className={`nav-link d-flex align-items-center gap-2 py-2 px-3 rounded text-decoration-none ${
                        isActive("/empresas") ? "bg-primary text-white" : "text-dark"
                      }`}
                    >
                      <Building size={20} />
                      <span>Empresas</span>
                    </Link>
                  )}
                  <Link
                    href="/configuracion"
                    className={`nav-link d-flex align-items-center gap-2 py-2 px-3 rounded text-decoration-none ${
                      isActive("/configuracion") ? "bg-primary text-white" : "text-dark"
                    }`}
                  >
                    <Settings size={20} />
                    <span>Configuración</span>
                  </Link>
                </nav>
              </div>
            )}
          </div>
          {/* Footer */}
          <div className="border-top p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                  <span className="text-white fw-bold">U</span>
                </div>
                <div>
                  <p className="mb-0 fw-medium" style={{ fontSize: "0.875rem" }}>
                    Usuario
                  </p>
                  <p className="mb-0 text-muted text-capitalize" style={{ fontSize: "0.75rem" }}>
                    {role}
                  </p>
                </div>
              </div>
              <button className="btn btn-outline-secondary btn-sm">
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Toggle Button - Solo visible en móviles */}
      <button className="btn btn-outline-secondary position-fixed d-md-none" style={{ top: "1rem", right: "1rem", zIndex: 1051 }} onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>

      {/* Overlay para móviles */}
      {!isCollapsed && (
        <div className="position-fixed w-100 h-100 d-md-none" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }} onClick={toggleSidebar}></div>
      )}
    </>
  );
}
