"use client";

import { useState } from "react";
import { BarChart3, Calendar, Clock, Edit } from "lucide-react";

export function ProjectList({ proyectos, role }: any) {

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "activo":
        return <span className="badge bg-success">Activo</span>;
      case "pendiente":
        return <span className="badge bg-warning text-dark">Pendiente</span>;
      case "finalizado":
        return <span className="badge bg-secondary">Finalizado</span>;
      default:
        return <span className="badge bg-light text-dark">Desconocido</span>;
    }
  };



  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-1">Listado de Proyectos</h5>
          <p className="card-subtitle text-muted mb-0">
            {role === "cliente" && "Visualiza el estado de tus proyectos"}
            {role === "operario" && "Visualiza proyectos (solo lectura)"}
            {role === "responsable" && "Gestiona proyectos de tu empresa"}
            {role === "superadmin" && "Gestiona todos los proyectos"}
          </p>
        </div>
        <div className="card-body">
          <div className="d-flex flex-column gap-4">
            {proyectos.map((proyecto: any) => (
              <div key={proyecto.id} className="border rounded p-3">
                <div className="row align-items-center">
                  <div className="col-md">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <BarChart3 size={18} className="text-primary" />
                      <h6 className="mb-0">{proyecto.nombre}</h6>
                      {getEstadoBadge(proyecto.estado)}
                    </div>
                    <div className="text-muted small d-flex flex-wrap gap-3">
                      <div className="d-flex align-items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {proyecto.fechaInicio} - {proyecto.fechaFin}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <Clock size={14} />
                        <span>Responsable: {proyecto.responsable}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-auto d-flex align-items-center gap-2 mt-3 mt-md-0">
                    <span className="small fw-medium">{proyecto.progreso}%</span>
                    <div className="progress w-100" style={{ maxWidth: "160px", height: "8px" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${proyecto.progreso}%` }}
                        aria-valuenow={proyecto.progreso}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
