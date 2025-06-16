"use client"

import { useState } from "react"
import { FileText, Download, Filter, Search, Calendar, Upload } from "lucide-react"


import { Header } from "../components/Header"


interface Factura {
  id: string
  numero: string
  fecha: string
  importe: string
  estado: "pagada" | "pendiente" | "vencida"
}

export default function FacturasPage() {
  const role = "superadmin"
  const [searchQuery, setSearchQuery] = useState("")

//   const canUpload = role === "responsable" || role === "superadmin"
  const canUpload = role === "superadmin"

  const facturas: Factura[] = [
    {
      id: "1",
      numero: "F-2023-001",
      fecha: "15/01/2023",
      importe: "1.250,00 €",
      estado: "pagada",
    },
    {
      id: "2",
      numero: "F-2023-002",
      fecha: "28/02/2023",
      importe: "875,50 €",
      estado: "pagada",
    },
    {
      id: "3",
      numero: "F-2023-003",
      fecha: "15/03/2023",
      importe: "2.340,75 €",
      estado: "pendiente",
    },
    {
      id: "4",
      numero: "F-2023-004",
      fecha: "10/04/2023",
      importe: "1.120,30 €",
      estado: "vencida",
    },
    {
      id: "5",
      numero: "F-2023-005",
      fecha: "22/05/2023",
      importe: "3.450,00 €",
      estado: "pendiente",
    },
  ]

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pagada":
        return (
          <span className="badge bg-success bg-opacity-10 text-success">
            Pagada
          </span>
        )
      case "pendiente":
        return (
          <span className="badge bg-warning bg-opacity-10 text-warning">
            Pendiente
          </span>
        )
      case "vencida":
        return (
          <span className="badge bg-danger bg-opacity-10 text-danger">
            Vencida
          </span>
        )
      default:
        return <span className="badge bg-secondary">Desconocido</span>
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header title="Facturas" />

      <div className="container py-5">
        <div className="d-flex flex-column gap-4">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h2 fw-bold">Facturas</h1>
            {canUpload && (
              <button className="btn btn-primary">
                <Upload className="me-2" size={16} />
                Subir factura
              </button>
            )}
          </div>

          <div className="d-flex flex-column flex-md-row gap-3">
            <div className="position-relative flex-grow-1">
              <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
              <input
                type="search"
                className="form-control ps-5"
                placeholder="Buscar facturas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="d-flex gap-2">
              <select className="form-select" style={{width: '180px'}} defaultValue="all">
                <option value="all">Todos los estados</option>
                <option value="pagada">Pagadas</option>
                <option value="pendiente">Pendientes</option>
                <option value="vencida">Vencidas</option>
              </select>

              <button className="btn btn-outline-secondary" type="button">
                <Calendar size={16} />
              </button>

              <button className="btn btn-outline-secondary" type="button">
                <Filter size={16} />
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Listado de Facturas</h5>
              <p className="card-subtitle text-muted mb-0">
                {/* {role === "cliente" && "Visualiza tus facturas y su estado de pago"}
                {role === "operario" && "Visualiza facturas (solo lectura)"}
                {role === "responsable" && "Gestiona facturas de tu empresa"} */}
                {role === "superadmin" && "Gestiona todas las facturas"}
              </p>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Fecha</th>
                      <th>Importe</th>
                      <th>Estado</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facturas.map((factura) => (
                      <tr key={factura.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <FileText className="text-primary" size={16} />
                            <span>{factura.numero}</span>
                          </div>
                        </td>
                        <td>{factura.fecha}</td>
                        <td>{factura.importe}</td>
                        <td>{getEstadoBadge(factura.estado)}</td>
                        <td className="text-end">
                          <div className="dropdown">
                            <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                              Acciones
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                <button className="dropdown-item">
                                  <FileText className="me-2" size={16} />
                                  <span>Ver factura</span>
                                </button>
                              </li>
                              <li>
                                <button className="dropdown-item">
                                  <Download className="me-2" size={16} />
                                  <span>Descargar PDF</span>
                                </button>
                              </li>
                              {/* {(role === "responsable" || role === "superadmin") && ( */}
                              {(role === "superadmin") && (
                                <>
                                  <li>
                                    <button className="dropdown-item">
                                      <span>Marcar como pagada</span>
                                    </button>
                                  </li>
                                  <li>
                                    <button className="dropdown-item">
                                      <span>Editar factura</span>
                                    </button>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">Resumen de Facturas</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Total facturas:</span>
                      <span className="fw-bold">5</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Pagadas:</span>
                      <span className="fw-bold text-success">2</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Pendientes:</span>
                      <span className="fw-bold text-warning">2</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Vencidas:</span>
                      <span className="fw-bold text-danger">1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">Importe Total</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1">Importe total de facturas</p>
                      <p className="h4 fw-bold mb-0">9.036,55 €</p>
                    </div>
                    <div>
                      <p className="text-muted mb-1">Pendiente de pago</p>
                      <p className="h5 fw-bold text-warning mb-0">6.911,05 €</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}