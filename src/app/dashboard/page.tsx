"use client";

import React, { useState, useEffect } from "react";
import { FileText, File, BarChart3, Search } from "lucide-react";

import { Header } from "../components/Header";
import { NotificationsList } from "../components/NotificationList";
import { RecentDocuments } from "../components/RecentDocuments";
import { ProjectList } from "../components/ProjectList";
import { ClientDetailsModal } from "../components/ClientDetailsModal";

import { Proyecto } from "@/types/index";

// Simulando los hooks y componentes que no están disponibles
const useRole = () => ({ role: "superadmin" }); // Cambiar según necesites

interface DocumentStats {
  total: number;
  lastMonthCount: number;
}
export default function DashboardPage() {
  const { role } = useRole();
  const [selectedClient, setSelectedClient] = useState(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);

  const [documentStats, setDocumentStats] = useState<DocumentStats>({
    total: 0,
    lastMonthCount: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  const [facturaStats, setFacturaStats] = useState({
    total: 0,
    lastMonthCount: 0,
  });

  const [clientStats, setClientStats] = useState({
    total: 0,
    lastMonthCount: 0,
  });
  const [loadingClientStats, setLoadingClientStats] = useState(true);

  useEffect(() => {
    async function fetchProyectos() {
      try {
        const res = await fetch("/api/proyectos");
        const data = await res.json();
        setProyectos(data);
      } catch (error) {
        console.error("Error fetching proyectos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProyectos();
  }, []);

  useEffect(() => {
    async function fetchDocumentStats() {
      try {
        setLoadingStats(true);
        const res = await fetch("/api/documentos/count");
        console.log(res);
        const data = await res.json();
        setDocumentStats(data);
      } catch (error) {
        console.error("Error fetching document stats:", error);
      } finally {
        setLoadingStats(false);
      }
    }

    fetchDocumentStats();
  }, []);

  useEffect(() => {
    async function fetchFacturaStats() {
      const res = await fetch("/api/facturas/count");
      const data = await res.json();
      setFacturaStats(data);
    }
    fetchFacturaStats();
  }, []);

  // Añade este efecto
  useEffect(() => {
    async function fetchClientStats() {
      try {
        setLoadingClientStats(true);
        const res = await fetch("/api/clientes/count");
        const data = await res.json();
        setClientStats(data);
      } catch (error) {
        console.error("Error fetching client stats:", error);
      } finally {
        setLoadingClientStats(false);
      }
    }

    fetchClientStats();
  }, []);

  // Función para formatear el mensaje de diferencia
  const getDifferenceText = (count: number) => {
    if (count === 0) return "Sin cambios desde el último mes";
    return `${count >= 0 ? "+" : ""}${count} desde el último mes`;
  };


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
                    {loadingStats ? (
                      <div className="placeholder-glow">
                        <h2 className="mb-1 placeholder col-4"></h2>
                        <small className="text-muted placeholder col-6"></small>
                      </div>
                    ) : (
                      <>
                        <h2 className="mb-1">{documentStats.total}</h2>
                        <small className="text-muted">{getDifferenceText(documentStats.lastMonthCount)}</small>
                      </>
                    )}
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
                    <h2 className="mb-1">{facturaStats.total}</h2>
                    <small className="text-muted">
                      {facturaStats.lastMonthCount > 0 ? `+${facturaStats.lastMonthCount} este mes` : "Sin cambios este mes"}
                    </small>
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
                      <h6 className="card-title text-muted mb-0">Clientes</h6>
                      <File className="text-muted" size={16} />
                    </div>
                    {loadingClientStats ? (
                      <div className="placeholder-glow">
                        <h2 className="mb-1 placeholder col-4"></h2>
                        <small className="text-muted placeholder col-8"></small>
                      </div>
                    ) : (
                      <>
                        <h2 className="mb-1">{clientStats.total}</h2>
                        <small className="text-muted">{getDifferenceText(clientStats.lastMonthCount)}</small>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Charts and Notifications */}
            <div className="row g-4">
              <div className="col-lg-8">
                <ProjectList proyectos={proyectos} role="superadmin" />
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

      {isClientModalOpen && <ClientDetailsModal client={selectedClient} onClose={() => setIsClientModalOpen(false)} isOpen={isClientModalOpen} />}
    </div>
  );
}
