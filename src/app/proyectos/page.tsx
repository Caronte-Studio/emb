"use client";

import { useState } from "react";
import {  Search, Filter, Calendar, PlusCircle, CheckCircle2 } from "lucide-react";
import { Header } from "../components/Header";
// import { useRole } from "@/components/role-provider"
import { ProjectTimeline } from "../components/ProjectTimeline";
import { ProjectEditor } from "../components/ProjectEditor"
import NewProjectForm from "../components/NewProjectForm";

interface Proyecto {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  progreso: number;
  estado: "en_curso" | "completado" | "pendiente";
  responsable: string;
}

export default function ProyectosPage() {
  const role = "superadmin";
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProject, setEditingProject] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("lista");
  const [selectValue, setSelectValue] = useState("all");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false)


  const canCreate = role === "superadmin";
  //   const canCreate = role === "responsable" || role === "superadmin"

  const proyectos: Proyecto[] = [
    {
      id: "1",
      nombre: "Reforma Oficina Central",
      fechaInicio: "10/01/2023",
      fechaFin: "30/06/2023",
      progreso: 75,
      estado: "en_curso",
      responsable: "Juan Pérez",
    },
    {
      id: "2",
      nombre: "Instalación Eléctrica",
      fechaInicio: "15/02/2023",
      fechaFin: "15/03/2023",
      progreso: 90,
      estado: "en_curso",
      responsable: "María López",
    },
    {
      id: "3",
      nombre: "Climatización",
      fechaInicio: "01/03/2023",
      fechaFin: "30/04/2023",
      progreso: 45,
      estado: "en_curso",
      responsable: "Carlos Rodríguez",
    },
    {
      id: "4",
      nombre: "Instalación Mobiliario",
      fechaInicio: "15/05/2023",
      fechaFin: "30/05/2023",
      progreso: 0,
      estado: "pendiente",
      responsable: "Ana Martínez",
    },
    {
      id: "5",
      nombre: "Mantenimiento Anual",
      fechaInicio: "01/01/2023",
      fechaFin: "31/12/2023",
      progreso: 30,
      estado: "en_curso",
      responsable: "Pedro Sánchez",
    },
  ];

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "en_curso":
        return <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10">En curso</span>;
      case "completado":
        return <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-10">Completado</span>;
      case "pendiente":
        return <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-10">Pendiente</span>;
      default:
        return <span className="badge bg-secondary">Desconocido</span>;
    }
  };

  const handleEditProject = (proyecto: any) => {
    const fullProject = {
      ...proyecto,
      descripcion: `Proyecto de ${proyecto.nombre}`,
      cliente: "Cliente Ejemplo",
      progresoTotal: proyecto.progreso,
      fases: [],
    };
    setEditingProject(fullProject);
  };

  const handleSaveProject = (updatedProject: any) => {
    console.log("Proyecto actualizado:", updatedProject);
    setEditingProject(null);
  };

  const handleCreateProject = (nuevoProyecto: any) => {
    console.log("Nuevo proyecto creado:", nuevoProyecto)
  }

  const selectOptions = [
    { value: "all", label: "Todos los estados" },
    { value: "en_curso", label: "En curso" },
    { value: "completado", label: "Completados" },
    { value: "pendiente", label: "Pendientes" },
  ];

  const selectedOption = selectOptions.find((opt) => opt.value === selectValue)?.label || "Seleccionar";

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header title="Proyectos" />

      <div className="container py-5">
        <div className="d-flex flex-column gap-4">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fs-3 fw-bold">Proyectos</h1>
            {canCreate && (
              <button className="btn btn-primary" onClick={() => setShowNewProjectForm(true)}>
                <PlusCircle className="me-2" size={16} />
                Nuevo proyecto
              </button>
            )}
          </div>

          <div className="d-flex flex-column gap-3 flex-md-row">
            <div className="position-relative flex-grow-1">
              <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
              <input
                type="search"
                className="form-control w-100 ps-5"
                placeholder="Buscar proyectos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="d-flex gap-2">
              <div className="dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" onClick={() => setIsSelectOpen(!isSelectOpen)}>
                  {selectedOption}
                </button>
                <ul className={`dropdown-menu ${isSelectOpen ? "show" : ""}`}>
                  {selectOptions.map((option) => (
                    <li key={option.value}>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setSelectValue(option.value);
                          setIsSelectOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="btn btn-outline-secondary p-2">
                <Calendar size={16} />
              </button>

              <button className="btn btn-outline-secondary p-2">
                <Filter size={16} />
              </button>
            </div>
          </div>

          <div className="d-flex flex-column gap-4">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Progreso de Proyectos</h3>
                <p className="card-subtitle text-muted">Línea temporal detallada del avance de cada proyecto</p>
              </div>
              <div className="card-body">
                <ProjectTimeline />
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title h5">Resumen de Proyectos</h3>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium small">Total proyectos:</span>
                      <span className="fw-bold">5</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium small">En curso:</span>
                      <span className="fw-bold text-primary">4</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium small">Completados:</span>
                      <span className="fw-bold text-success">0</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium small">Pendientes:</span>
                      <span className="fw-bold text-warning">1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title h5">Próximos Hitos</h3>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    <div className="border rounded p-3">
                      <div className="d-flex align-items-center gap-2">
                        <CheckCircle2 className="text-primary" size={20} />
                        <div>
                          <h4 className="fw-medium mb-0">Finalización Instalación Eléctrica</h4>
                          <p className="text-muted small mb-0">15/03/2023 (en 5 días)</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded p-3">
                      <div className="d-flex align-items-center gap-2">
                        <CheckCircle2 className="text-primary" size={20} />
                        <div>
                          <h4 className="fw-medium mb-0">Finalización Climatización</h4>
                          <p className="text-muted small mb-0">30/04/2023 (en 45 días)</p>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded p-3">
                      <div className="d-flex align-items-center gap-2">
                        <CheckCircle2 className="text-primary" size={20} />
                        <div>
                          <h4 className="fw-medium mb-0">Inicio Instalación Mobiliario</h4>
                          <p className="text-muted small mb-0">15/05/2023 (en 60 días)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editingProject && (
        <ProjectEditor
          proyecto={editingProject}
          onSave={handleSaveProject}
          onClose={() => setEditingProject(null)}
          open={!!editingProject}
        />
      )}
      <NewProjectForm
        open={showNewProjectForm}
        onClose={() => setShowNewProjectForm(false)}
        onSave={handleCreateProject}
      />
    </div>
  );
}
