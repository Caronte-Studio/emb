"use client"

import { useState } from "react"
import {
  Calendar,
  Building2,
  Euro,
  Clock,
  Save,
  X,
  Layout,
  CheckCircle2,
} from "lucide-react"

interface Cliente {
  id: string
  nombre: string
  empresa_cliente?: string
  email: string
  tipo: "empresa" | "particular"
}

interface Plantilla {
  id: string
  nombre: string
  descripcion: string
  categoria: string
  etiquetas: string[]
  duracion_estimada: number
  fases: number
  checkpoints: number
}

interface NewProjectFormProps {
  open: boolean
  onClose: () => void
  onSave: (proyecto: any) => void
}

export default function NewProjectForm({ open, onClose, onSave }: NewProjectFormProps) {
  const [activeTab, setActiveTab] = useState("basico")
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    cliente_id: "",
    empresa_id: "",
    plantilla_id: "",
    estado: "planificacion",
    prioridad: "media",
    fecha_inicio: "",
    fecha_fin_estimada: "",
    presupuesto: "",
    notas: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Datos de ejemplo
  const clientes: Cliente[] = [
    {
      id: "1",
      nombre: "Juan Pérez",
      empresa_cliente: "Construcciones Pérez S.L.",
      email: "juan@construccionesperez.com",
      tipo: "empresa",
    },
    {
      id: "2",
      nombre: "María López",
      empresa_cliente: "Reformas López",
      email: "maria@reformaslopez.com",
      tipo: "empresa",
    },
    {
      id: "3",
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      tipo: "particular",
    },
    {
      id: "4",
      nombre: "Ana Martínez",
      empresa_cliente: "Inmobiliaria Martínez",
      email: "ana@inmobiliariamartinez.com",
      tipo: "empresa",
    },
  ]

  const empresas = [
    { id: "1", nombre: "Juan Pérez", especialidad: "Arquitecto Técnico" },
    { id: "2", nombre: "María López", especialidad: "Jefe de Obra" },
    { id: "3", nombre: "Carlos Rodríguez", especialidad: "Director de Proyecto" },
    { id: "4", nombre: "Ana Martínez", especialidad: "Gestor Administrativo" },
    { id: "5", nombre: "Pedro Sánchez", especialidad: "Arquitecto Principal" },
  ]

  const plantillas: Plantilla[] = [
    {
      id: "1",
      nombre: "Reforma Integral de Vivienda",
      descripcion: "Plantilla completa para reformas integrales incluyendo demolición, instalaciones y acabados",
      categoria: "Reformas",
      etiquetas: ["reforma", "vivienda", "integral"],
      duracion_estimada: 90,
      fases: 6,
      checkpoints: 24,
    },
    {
      id: "2",
      nombre: "Instalación Eléctrica",
      descripcion: "Proceso estándar para instalaciones eléctricas completas",
      categoria: "Instalaciones",
      etiquetas: ["electricidad", "instalación"],
      duracion_estimada: 30,
      fases: 4,
      checkpoints: 12,
    },
    {
      id: "3",
      nombre: "Climatización HVAC",
      descripcion: "Instalación completa de sistemas de climatización",
      categoria: "Climatización",
      etiquetas: ["hvac", "climatización", "aire"],
      duracion_estimada: 45,
      fases: 5,
      checkpoints: 18,
    },
    {
      id: "4",
      nombre: "Construcción Nueva",
      descripcion: "Plantilla para construcción de obra nueva desde cimientos",
      categoria: "Construcción",
      etiquetas: ["construcción", "obra nueva"],
      duracion_estimada: 180,
      fases: 8,
      checkpoints: 35,
    },
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre del proyecto es obligatorio"
    }

    if (!formData.cliente_id) {
      newErrors.cliente_id = "Debe seleccionar un cliente"
    }

    if (!formData.empresa_id) {
      newErrors.empresa_id = "Debe asignar a una empresa"
    }

    if (!formData.fecha_inicio) {
      newErrors.fecha_inicio = "La fecha de inicio es obligatoria"
    }

    if (!formData.fecha_fin_estimada) {
      newErrors.fecha_fin_estimada = "La fecha de fin estimada es obligatoria"
    }

    if (formData.fecha_inicio && formData.fecha_fin_estimada) {
      const fechaInicio = new Date(formData.fecha_inicio)
      const fechaFin = new Date(formData.fecha_fin_estimada)
      if (fechaFin <= fechaInicio) {
        newErrors.fecha_fin_estimada = "La fecha de fin debe ser posterior a la fecha de inicio"
      }
    }

    if (formData.presupuesto && isNaN(Number(formData.presupuesto))) {
      newErrors.presupuesto = "El presupuesto debe ser un número válido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) {
      return
    }

    const selectedTemplateData = plantillas.find((t) => t.id === formData.plantilla_id)

    const nuevoProyecto = {
      id: `proyecto-${Date.now()}`,
      ...formData,
      presupuesto: formData.presupuesto ? Number(formData.presupuesto) : null,
      progreso_total: 0,
      plantilla: selectedTemplateData,
      created_at: new Date().toISOString(),
    }

    onSave(nuevoProyecto)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      cliente_id: "",
      empresa_id: "",
      plantilla_id: "",
      estado: "planificacion",
      prioridad: "media",
      fecha_inicio: "",
      fecha_fin_estimada: "",
      presupuesto: "",
      notas: "",
    })
    setSelectedTemplate("")
    setErrors({})
    setActiveTab("basico")
    onClose()
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    setFormData({ ...formData, plantilla_id: templateId })

    // Auto-calcular fecha de fin basada en la duración estimada de la plantilla
    if (formData.fecha_inicio && templateId) {
      const template = plantillas.find((t) => t.id === templateId)
      if (template) {
        const fechaInicio = new Date(formData.fecha_inicio)
        const fechaFin = new Date(fechaInicio)
        fechaFin.setDate(fechaFin.getDate() + template.duracion_estimada)
        setFormData({
          ...formData,
          plantilla_id: templateId,
          fecha_fin_estimada: fechaFin.toISOString().split("T")[0],
        })
      }
    }
  }

  const getPrioridadBadgeClass = (prioridad: string) => {
    switch (prioridad) {
      case "baja":
        return "bg-success"
      case "media":
        return "bg-warning"
      case "alta":
        return "bg-primary"
      case "critica":
        return "bg-danger"
      default:
        return "bg-secondary"
    }
  }

  if (!open) return null

  return (
    <>
      {/* Bootstrap CDN */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
      ></script>

      {/* Modal Backdrop */}
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>

      {/* Modal */}
      <div 
        className="modal fade show d-block" 
        style={{ zIndex: 1050 }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title d-flex align-items-center">
                <Building2 className="me-2" size={20} />
                Crear Nuevo Proyecto
              </h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            
            <div className="modal-body">
              <p className="text-muted mb-4">
                Complete la información básica del proyecto y seleccione una plantilla para comenzar.
              </p>

              {/* Tabs Navigation */}
              <ul className="nav nav-tabs mb-4" role="tablist">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'basico' ? 'active' : ''}`}
                    onClick={() => setActiveTab('basico')}
                  >
                    Información Básica
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'plantilla' ? 'active' : ''}`}
                    onClick={() => setActiveTab('plantilla')}
                  >
                    Plantilla
                  </button>
                </li>
                
              </ul>

              {/* Tab Content */}
              <div className="tab-content">
                {/* Información Básica */}
                {activeTab === 'basico' && (
                  <div className="tab-pane fade show active">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="nombre" className="form-label">
                          Nombre del Proyecto <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                          id="nombre"
                          placeholder="Ej: Reforma Oficina Central"
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        />
                        {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="cliente" className="form-label">
                          Cliente <span className="text-danger">*</span>
                        </label>
                        <select
                          className={`form-select ${errors.cliente_id ? 'is-invalid' : ''}`}
                          value={formData.cliente_id}
                          onChange={(e) => setFormData({ ...formData, cliente_id: e.target.value })}
                        >
                          <option value="">Seleccionar cliente</option>
                          {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                              {cliente.nombre} {cliente.empresa_cliente && `- ${cliente.empresa_cliente}`}
                            </option>
                          ))}
                        </select>
                        {errors.cliente_id && <div className="invalid-feedback">{errors.cliente_id}</div>}
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="empresa" className="form-label">
                          empresa <span className="text-danger">*</span>
                        </label>
                        <select
                          className={`form-select ${errors.empresa_id ? 'is-invalid' : ''}`}
                          value={formData.empresa_id}
                          onChange={(e) => setFormData({ ...formData, empresa_id: e.target.value })}
                        >
                          <option value="">Asignar a empresa</option>
                          {empresas.map((empresa) => (
                            <option key={empresa.id} value={empresa.id}>
                              {empresa.nombre} - {empresa.especialidad}
                            </option>
                          ))}
                        </select>
                        {errors.empresa_id && <div className="invalid-feedback">{errors.empresa_id}</div>}
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="presupuesto" className="form-label">Presupuesto (€)</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <Euro  size={16} />
                          </span>
                          <input
                            type="number"
                            className={`form-control ${errors.presupuesto ? 'is-invalid' : ''}`}
                            id="presupuesto"
                            placeholder="0.00"
                            value={formData.presupuesto}
                            onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                          />
                          {errors.presupuesto && <div className="invalid-feedback">{errors.presupuesto}</div>}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="fecha_inicio" className="form-label">
                          Fecha de Inicio <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <Calendar size={16} />
                          </span>
                          <input
                            type="date"
                            className={`form-control ${errors.fecha_inicio ? 'is-invalid' : ''}`}
                            id="fecha_inicio"
                            value={formData.fecha_inicio}
                            onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
                          />
                          {errors.fecha_inicio && <div className="invalid-feedback">{errors.fecha_inicio}</div>}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="fecha_fin_estimada" className="form-label">
                          Fecha de Fin Estimada <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <Calendar size={16} />
                          </span>
                          <input
                            type="date"
                            className={`form-control ${errors.fecha_fin_estimada ? 'is-invalid' : ''}`}
                            id="fecha_fin_estimada"
                            value={formData.fecha_fin_estimada}
                            onChange={(e) => setFormData({ ...formData, fecha_fin_estimada: e.target.value })}
                          />
                          {errors.fecha_fin_estimada && <div className="invalid-feedback">{errors.fecha_fin_estimada}</div>}
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="descripcion" className="form-label">Descripción del Proyecto</label>
                        <textarea
                          className="form-control"
                          id="descripcion"
                          rows={4}
                          placeholder="Describe los objetivos y alcance del proyecto..."
                          value={formData.descripcion}
                          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {/* Plantillas */}
                {activeTab === 'plantilla' && (
                  <div className="tab-pane fade show active">
                    <div className="mb-4">
                      <h5>Seleccionar Plantilla</h5>
                      <p className="text-muted">
                        Elija una plantilla para estructurar automáticamente las fases y checkpoints del proyecto.
                      </p>
                    </div>

                    <div className="row g-3">
                      {plantillas.map((plantilla) => (
                        <div key={plantilla.id} className="col-12">
                          <div 
                            className={`card h-100 cursor-pointer ${
                              selectedTemplate === plantilla.id ? 'border-primary shadow' : ''
                            }`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleTemplateSelect(plantilla.id)}
                          >
                            <div className="card-header d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="card-title mb-1 d-flex align-items-center">
                                  <Layout className="me-2" size={16} />
                                  {plantilla.nombre}
                                  {selectedTemplate === plantilla.id && (
                                    <CheckCircle2 className="ms-2 text-primary" size={16} />
                                  )}
                                </h6>
                                <p className="card-text text-muted small mb-0">{plantilla.descripcion}</p>
                              </div>
                              <span className="badge bg-secondary">{plantilla.categoria}</span>
                            </div>
                            <div className="card-body">
                              <div className="d-flex gap-3 mb-3 small text-muted">
                                <span className="d-flex align-items-center">
                                  <Clock size={14} className="me-1" />
                                  {plantilla.duracion_estimada} días
                                </span>
                                <span>{plantilla.fases} fases</span>
                                <span>{plantilla.checkpoints} checkpoints</span>
                              </div>
                              <div className="d-flex gap-1 flex-wrap">
                                {plantilla.etiquetas.map((etiqueta) => (
                                  <span key={etiqueta} className="badge bg-light text-dark">
                                    {etiqueta}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="col-12">
                        <div className="card border-2 border-dashed">
                          <div className="card-body text-center py-5">
                            <Layout size={48} className="text-muted mb-3" />
                            <h6 className="mb-2">Sin Plantilla</h6>
                            <p className="text-muted mb-3">
                              Crear un proyecto vacío sin fases predefinidas
                            </p>
                            <button 
                              className="btn btn-outline-primary"
                              onClick={() => handleTemplateSelect("")}
                            >
                              Seleccionar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

               
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                <X className="me-2" size={16} />
                Cancelar
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                <Save className="me-2" size={16} />
                Crear Proyecto
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}