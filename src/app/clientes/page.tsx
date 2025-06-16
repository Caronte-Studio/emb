"use client"

import { useState } from "react"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Phone, Mail, MapPin, Building, DollarSign, FileText, Download, Upload } from "lucide-react"

interface Client {
  id: string
  name: string
  company: string
  email: string
  phone: string
  address: string
  city: string
  status: "activo" | "inactivo" | "prospecto"
  type: "empresa" | "particular"
  projects: number
  totalValue: number
  lastContact: string
  avatar?: string
  notes?: string
  createdAt: string
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "María García López",
    company: "Construcciones García S.L.",
    email: "maria@construccionesgarcia.com",
    phone: "+34 666 123 456",
    address: "Calle Mayor 123",
    city: "Madrid",
    status: "activo",
    type: "empresa",
    projects: 5,
    totalValue: 125000,
    lastContact: "2024-01-15",
    createdAt: "2023-06-15",
    notes: "Cliente preferente. Siempre paga a tiempo.",
  },
  // ... otros clientes
]

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [typeFilter, setTypeFilter] = useState<string>("todos")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Filtrar clientes
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || client.status === statusFilter
    const matchesType = typeFilter === "todos" || client.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: Client["status"]) => {
    const colors = {
      activo: "bg-success text-white",
      inactivo: "bg-secondary text-white",
      prospecto: "bg-info text-white",
    }

    return (
      <span className={`badge ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getTypeBadge = (type: Client["type"]) => {
    return (
      <span className="badge bg-light text-dark">
        {type === "empresa" ? "Empresa" : "Particular"}
      </span>
    )
  }

  const handleViewClient = (client: Client) => {
    setSelectedClient(client)
    setIsViewDialogOpen(true)
  }

  const handleEditClient = (client: Client) => {
    setSelectedClient(client)
    setIsEditDialogOpen(true)
  }

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter((c) => c.id !== clientId))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES")
  }

  // Estadísticas
  const stats = {
    total: clients.length,
    activos: clients.filter((c) => c.status === "activo").length,
    prospectos: clients.filter((c) => c.status === "prospecto").length,
    totalValue: clients.reduce((sum, c) => sum + c.totalValue, 0),
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-1">Clientes</h1>
          <p className="text-muted">Gestiona tu cartera de clientes y prospectos</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary">
            <Upload size={16} className="me-2" />
            Importar
          </button>
          <button className="btn btn-outline-secondary">
            <Download size={16} className="me-2" />
            Exportar
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus size={16} className="me-2" />
            Nuevo Cliente
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Clientes</h6>
                  <h4 className="mb-0">{stats.total}</h4>
                </div>
                <Building size={20} className="text-muted" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Clientes Activos</h6>
                  <h4 className="mb-0 text-success">{stats.activos}</h4>
                </div>
                <Building size={20} className="text-success" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Prospectos</h6>
                  <h4 className="mb-0 text-info">{stats.prospectos}</h4>
                </div>
                <Building size={20} className="text-info" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Valor Total</h6>
                  <h4 className="mb-0">{formatCurrency(stats.totalValue)}</h4>
                </div>
                <DollarSign size={20} className="text-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Filtros</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="todos">Todos los estados</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="prospecto">Prospecto</option>
              </select>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="todos">Todos los tipos</option>
                <option value="empresa">Empresa</option>
                <option value="particular">Particular</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de clientes */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Lista de Clientes ({filteredClients.length})</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Contacto</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Proyectos</th>
                  <th>Valor Total</th>
                  <th>Último Contacto</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div className="avatar">
                          <span className="avatar-initial rounded-circle bg-light text-dark">
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="fw-medium">{client.name}</div>
                          <small className="text-muted">{client.company}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-1">
                        <div className="d-flex align-items-center gap-1 small">
                          <Mail size={14} />
                          {client.email}
                        </div>
                        <div className="d-flex align-items-center gap-1 small">
                          <Phone size={14} />
                          {client.phone}
                        </div>
                      </div>
                    </td>
                    <td>{getTypeBadge(client.type)}</td>
                    <td>{getStatusBadge(client.status)}</td>
                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <FileText size={16} className="text-muted" />
                        {client.projects}
                      </div>
                    </td>
                    <td className="fw-medium">{formatCurrency(client.totalValue)}</td>
                    <td>{formatDate(client.lastContact)}</td>
                    <td className="text-end">
                      <div className="dropdown">
                        <button 
                          className="btn btn-sm btn-link text-dark p-0" 
                          type="button" 
                          data-bs-toggle="dropdown"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <button 
                              className="dropdown-item" 
                              onClick={() => handleViewClient(client)}
                            >
                              <Eye size={16} className="me-2" />
                              Ver detalles
                            </button>
                          </li>
                          <li>
                            <button 
                              className="dropdown-item" 
                              onClick={() => handleEditClient(client)}
                            >
                              <Edit size={16} className="me-2" />
                              Editar
                            </button>
                          </li>
                          <li><hr className="dropdown-divider" /></li>
                          <li>
                            <button 
                              className="dropdown-item text-danger" 
                              onClick={() => handleDeleteClient(client.id)}
                            >
                              <Trash2 size={16} className="me-2" />
                              Eliminar
                            </button>
                          </li>
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

      {/* Modal de creación de cliente */}
      <div className={`modal ${isCreateDialogOpen ? 'show d-block' : ''}`} tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Crear Nuevo Cliente</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setIsCreateDialogOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Nombre completo</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    placeholder="Nombre del cliente" 
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="company" className="form-label">Empresa</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="company" 
                    placeholder="Nombre de la empresa" 
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="email@ejemplo.com" 
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">Teléfono</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="phone" 
                    placeholder="+34 666 123 456" 
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="address" className="form-label">Dirección</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="address" 
                    placeholder="Calle, número" 
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">Ciudad</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="city" 
                    placeholder="Ciudad" 
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="type" className="form-label">Tipo</label>
                  <select className="form-select" id="type">
                    <option value="">Seleccionar tipo</option>
                    <option value="empresa">Empresa</option>
                    <option value="particular">Particular</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="status" className="form-label">Estado</label>
                  <select className="form-select" id="status">
                    <option value="">Seleccionar estado</option>
                    <option value="prospecto">Prospecto</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
                <div className="col-12">
                  <label htmlFor="notes" className="form-label">Notas</label>
                  <textarea 
                    className="form-control" 
                    id="notes" 
                    rows={3}
                    placeholder="Notas adicionales sobre el cliente"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Crear Cliente
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de vista de cliente */}
      <div className={`modal ${isViewDialogOpen ? 'show d-block' : ''}`} tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Detalles del Cliente</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setIsViewDialogOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              {selectedClient && (
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex align-items-center gap-4">
                    <div className="avatar avatar-xl">
                      <span className="avatar-initial rounded-circle bg-light text-dark">
                        {selectedClient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="mb-1">{selectedClient.name}</h3>
                      <p className="text-muted mb-2">{selectedClient.company}</p>
                      <div className="d-flex gap-2">
                        {getStatusBadge(selectedClient.status)}
                        {getTypeBadge(selectedClient.type)}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-body">
                          <h6 className="mb-3">Información de Contacto</h6>
                          <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                              <div className="d-flex align-items-center gap-2">
                                <Mail size={16} className="text-muted" />
                                <span>{selectedClient.email}</span>
                              </div>
                            </li>
                            <li className="mb-2">
                              <div className="d-flex align-items-center gap-2">
                                <Phone size={16} className="text-muted" />
                                <span>{selectedClient.phone}</span>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex align-items-center gap-2">
                                <MapPin size={16} className="text-muted" />
                                <span>{selectedClient.address}, {selectedClient.city}</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-body">
                          <h6 className="mb-3">Estadísticas</h6>
                          <ul className="list-unstyled mb-0">
                            <li className="mb-2 d-flex justify-content-between">
                              <span>Proyectos:</span>
                              <span className="fw-medium">{selectedClient.projects}</span>
                            </li>
                            <li className="mb-2 d-flex justify-content-between">
                              <span>Valor total:</span>
                              <span className="fw-medium">{formatCurrency(selectedClient.totalValue)}</span>
                            </li>
                            <li className="mb-2 d-flex justify-content-between">
                              <span>Cliente desde:</span>
                              <span className="fw-medium">{formatDate(selectedClient.createdAt)}</span>
                            </li>
                            <li className="d-flex justify-content-between">
                              <span>Último contacto:</span>
                              <span className="fw-medium">{formatDate(selectedClient.lastContact)}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedClient.notes && (
                    <div className="card">
                      <div className="card-body">
                        <h6 className="mb-2">Notas</h6>
                        <p className="mb-0 text-muted">{selectedClient.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={() => setIsViewDialogOpen(false)}
              >
                Cerrar
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => {
                  setIsViewDialogOpen(false)
                  if (selectedClient) handleEditClient(selectedClient)
                }}
              >
                Editar Cliente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}