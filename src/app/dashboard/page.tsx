"use client";

import React, { useState } from "react";
import { FileText, File, BarChart3, Search } from "lucide-react";

import { Header } from "../components/Header";
import { NotificationsList } from "../components/NotificationList";
import { RecentDocuments } from "../components/RecentDocuments";
import { ProjectList } from "../components/ProjectList";
import { ClientDetailsModal } from "../components/ClientDetailsModal";


interface Proyecto {
  id: string
  nombre: string
  fechaInicio: string
  fechaFin: string
  progreso: number
  estado: "en_curso" | "completado" | "pendiente"
  responsable: string
}

// Simulando los hooks y componentes que no están disponibles
const useRole = () => ({ role: "superadmin" }); // Cambiar según necesites

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
  ]


export default function DashboardPage() {
  const { role } = useRole();
  const [selectedClient, setSelectedClient] = useState(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleViewClientDetails = (client: any) => {
    setSelectedClient(client);
    setIsClientModalOpen(true);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header title="Dashboard" />

      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="display-6 fw-bold">Dashboard</h2>
        </div>

        {/* Tabs Navigation
        <ul className="nav nav-tabs mb-4" role="tablist">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "general" ? "active" : ""}`} onClick={() => setActiveTab("general")}>
              General
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "documentos" ? "active" : ""}`} onClick={() => setActiveTab("documentos")}>
              Documentos
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "proyectos" ? "active" : ""}`} onClick={() => setActiveTab("proyectos")}>
              Proyectos
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "clientes" ? "active" : ""}`} onClick={() => setActiveTab("clientes")}>
              Clientes
            </button>
          </li>
          {(role === "responsable" || role === "superadmin") && (
            <li className="nav-item">
              <button className={`nav-link ${activeTab === "administracion" ? "active" : ""}`} onClick={() => setActiveTab("administracion")}>
                Administración
              </button>
            </li>
          )}
          {role === "operario" && (
            <li className="nav-item">
              <button className={`nav-link ${activeTab === "corporativo" ? "active" : ""}`} onClick={() => setActiveTab("corporativo")}>
                Documentación Corporativa
              </button>
            </li>
          )}
        </ul> */}

        {/* Tab Content */}
        {/* <div className="tab-content"> */}
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="tab-pane fade show active">
              {/* Stats Cards */}
              <div className="row g-4 mb-4">
                <div className="col-md-6 col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="card-title text-muted mb-0">Documentos Totales</h6>
                        <FileText className="text-muted" size={16} />
                      </div>
                      <h2 className="mb-1">24</h2>
                      <small className="text-muted">+2 desde el último mes</small>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="card-title text-muted mb-0">Facturas</h6>
                        <FileText className="text-muted" size={16} />
                      </div>
                      <h2 className="mb-1">8</h2>
                      <small className="text-muted">+1 desde el último mes</small>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="card-title text-muted mb-0">Documentos Corporativos</h6>
                        <FileText className="text-muted" size={16} />
                      </div>
                      <h2 className="mb-1">12</h2>
                      <small className="text-muted">+4 desde el último mes</small>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="card-title text-muted mb-0">Garantías</h6>
                        <File className="text-muted" size={16} />
                      </div>
                      <h2 className="mb-1">4</h2>
                      <small className="text-muted">Sin cambios desde el último mes</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts and Notifications */}
              <div className="row g-4">
                <div className="col-lg-8">
                  <ProjectList proyectos={proyectos} role="superadmin"/>
                </div>

                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Notificaciones Recientes</h5>
                      <small className="text-muted">Has recibido 5 notificaciones este mes</small>
                    </div>
                    <div className="card-body">
                      <NotificationsList />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* </div> */}
      </div>

      {isClientModalOpen && <ClientDetailsModal client={selectedClient} onClose={() => setIsClientModalOpen(false)} isOpen={isClientModalOpen}/>}

     
    </div>
  );
}
