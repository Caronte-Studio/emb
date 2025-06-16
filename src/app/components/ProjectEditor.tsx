"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Clock, AlertCircle, Calendar, User, FileText, Edit, Trash2, Plus, Save, ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react"
import ProjectDocumentation from "../components/ProjectDocumentation"

interface Checkpoint {
  id: string
  nombre: string
  descripcion: string
  fechaInicio: string
  fechaFin: string
  estado: "completado" | "en_progreso" | "pendiente" | "retrasado"
  responsable: string
  documentos?: string[]
}

interface Fase {
  id: string
  nombre: string
  descripcion: string
  fechaInicio: string
  fechaFin: string
  estado: "completado" | "en_progreso" | "pendiente"
  progreso: number
  checkpoints: Checkpoint[]
}

interface Proyecto {
  id: string
  nombre: string
  descripcion: string
  fechaInicio: string
  fechaFin: string
  cliente: string
  responsable: string
  estado: "en_curso" | "completado" | "pendiente"
  progresoTotal: number
  fases: Fase[]
}

interface ProjectEditorProps {
  proyecto: Proyecto
  onSave: (proyecto: Proyecto) => void
  onClose: () => void
  open: boolean
}

export function ProjectEditor({ proyecto, onSave, onClose, open }: ProjectEditorProps) {
  const [editedProject, setEditedProject] = useState<Proyecto>(proyecto)
  const [expandedPhases, setExpandedPhases] = useState<string[]>([])
  const [editingPhase, setEditingPhase] = useState<Fase | null>(null)
  const [editingCheckpoint, setEditingCheckpoint] = useState<Checkpoint | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: "phase" | "checkpoint"; id: string } | null>(null)
  const [activeTab, setActiveTab] = useState("general")

  const responsables = [
    "Juan Pérez",
    "María López",
    "Carlos Rodríguez",
    "Ana Martínez",
    "Pedro Sánchez",
    "Arquitecto Técnico",
    "Arquitecto Principal",
    "Gestor Administrativo",
    "Jefe de Obra",
    "Equipo Demolición",
    "Equipo Limpieza",
    "Electricista Jefe",
    "Fontanero Jefe",
    "Técnico Climatización",
    "Solador",
    "Pintor",
    "Decorador",
    "Montador",
    "Técnico IT",
    "Director Proyecto",
  ]

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => (prev.includes(phaseId) ? prev.filter((id) => id !== phaseId) : [...prev, phaseId]));
  }

  const handleSaveProject = () => {
    const totalFases = editedProject.fases.length
    const progresoTotal = totalFases > 0 ? editedProject.fases.reduce((acc, fase) => acc + fase.progreso, 0) / totalFases : 0

    const updatedProject = {
      ...editedProject,
      progresoTotal: Math.round(progresoTotal),
    }

    onSave(updatedProject)
    onClose()
  }

  const handleAddPhase = () => {
    const newPhase: Fase = {
      id: `${editedProject.id}-${Date.now()}`,
      nombre: "Nueva Fase",
      descripcion: "",
      fechaInicio: new Date().toLocaleDateString(),
      fechaFin: new Date().toLocaleDateString(),
      estado: "pendiente",
      progreso: 0,
      checkpoints: [],
    }
    setEditingPhase(newPhase)
  }

  const handleEditPhase = (fase: Fase) => {
    setEditingPhase({ ...fase })
  }

  const handleSavePhase = () => {
    if (!editingPhase) return

    const isNew = !editedProject.fases.find((f) => f.id === editingPhase.id)

    if (isNew) {
      setEditedProject((prev) => ({
        ...prev,
        fases: [...prev.fases, editingPhase],
      }))
    } else {
      setEditedProject((prev) => ({
        ...prev,
        fases: prev.fases.map((f) => (f.id === editingPhase.id ? editingPhase : f)),
      }))
    }

    setEditingPhase(null)
  }

  const handleDeletePhase = (phaseId: string) => {
    setEditedProject((prev) => ({
      ...prev,
      fases: prev.fases.filter((f) => f.id !== phaseId),
    }))
    setDeleteConfirm(null)
  }

  const handleAddCheckpoint = (phaseId: string) => {
    const newCheckpoint: Checkpoint = {
      id: `${phaseId}-${Date.now()}`,
      nombre: "Nuevo Checkpoint",
      descripcion: "",
      fechaInicio: new Date().toLocaleDateString(),
      fechaFin: new Date().toLocaleDateString(),
      estado: "pendiente",
      responsable: "",
      documentos: [],
    }
    setEditingCheckpoint(newCheckpoint)
  }

  const handleEditCheckpoint = (checkpoint: Checkpoint) => {
    setEditingCheckpoint({ ...checkpoint })
  }

  const handleSaveCheckpoint = () => {
    if (!editingCheckpoint) return

    const phaseId = editingCheckpoint.id.split("-").slice(0, -1).join("-")
    const isNew = !editedProject.fases
      .find((f) => f.id === phaseId)
      ?.checkpoints.find((c) => c.id === editingCheckpoint.id)

    setEditedProject((prev) => ({
      ...prev,
      fases: prev.fases.map((fase) => {
        if (fase.id === phaseId) {
          if (isNew) {
            return {
              ...fase,
              checkpoints: [...fase.checkpoints, editingCheckpoint],
            }
          } else {
            return {
              ...fase,
              checkpoints: fase.checkpoints.map((c) => (c.id === editingCheckpoint.id ? editingCheckpoint : c)),
            }
          }
        }
        return fase
      }),
    }))

    setEditingCheckpoint(null)
  }

  const handleDeleteCheckpoint = (checkpointId: string) => {
    const phaseId = checkpointId.split("-").slice(0, -1).join("-")

    setEditedProject((prev) => ({
      ...prev,
      fases: prev.fases.map((fase) => {
        if (fase.id === phaseId) {
          return {
            ...fase,
            checkpoints: fase.checkpoints.filter((c) => c.id !== checkpointId),
          }
        }
        return fase
      }),
    }))
    setDeleteConfirm(null)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "completado":
        return <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-10">Completado</span>
      case "en_progreso":
        return <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10">En Progreso</span>
      case "retrasado":
        return <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-10">Retrasado</span>
      default:
        return <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-10">Pendiente</span>
    }
  }

  return (
    <>
      {/* Modal principal */}
      <div className={`modal ${open ? 'show d-block' : ''}`} tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Proyecto: {editedProject.nombre}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                    onClick={() => setActiveTab('general')}
                  >
                    Información General
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'fases' ? 'active' : ''}`}
                    onClick={() => setActiveTab('fases')}
                  >
                    Fases y Checkpoints
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'documentacion' ? 'active' : ''}`}
                    onClick={() => setActiveTab('documentacion')}
                  >
                    Documentación
                  </button>
                </li>
              </ul>

              {activeTab === 'general' && (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre del Proyecto</label>
                    <input
                      id="nombre"
                      className="form-control"
                      value={editedProject.nombre}
                      onChange={(e) => setEditedProject({ ...editedProject, nombre: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="cliente" className="form-label">Cliente</label>
                    <input
                      id="cliente"
                      className="form-control"
                      value={editedProject.cliente}
                      onChange={(e) => setEditedProject({ ...editedProject, cliente: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="responsable" className="form-label">Responsable</label>
                    <select
                      id="responsable"
                      className="form-select"
                      value={editedProject.responsable}
                      onChange={(e) => setEditedProject({ ...editedProject, responsable: e.target.value })}
                    >
                      <option value="">Seleccionar responsable</option>
                      {responsables.map((responsable) => (
                        <option key={responsable} value={responsable}>{responsable}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="estado" className="form-label">Estado</label>
                    <select
                      id="estado"
                      className="form-select"
                      value={editedProject.estado}
                      onChange={(e) => setEditedProject({ ...editedProject, estado: e.target.value as any })}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_curso">En Curso</option>
                      <option value="completado">Completado</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="fechaInicio" className="form-label">Fecha de Inicio</label>
                    <input
                      id="fechaInicio"
                      type="date"
                      className="form-control"
                      value={editedProject.fechaInicio}
                      onChange={(e) => setEditedProject({ ...editedProject, fechaInicio: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="fechaFin" className="form-label">Fecha de Fin</label>
                    <input
                      id="fechaFin"
                      type="date"
                      className="form-control"
                      value={editedProject.fechaFin}
                      onChange={(e) => setEditedProject({ ...editedProject, fechaFin: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea
                      id="descripcion"
                      className="form-control"
                      value={editedProject.descripcion}
                      onChange={(e) => setEditedProject({ ...editedProject, descripcion: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'fases' && (
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="h5">Fases del Proyecto</h3>
                    <button className="btn btn-primary" onClick={handleAddPhase}>
                      <Plus size={16} className="me-2" />
                      Añadir Fase
                    </button>
                  </div>

                  {editedProject.fases.length === 0 ? (
                    <div className="text-center py-4 text-muted">
                      <p>No hay fases definidas para este proyecto</p>
                      <button className="btn btn-outline-secondary mt-2" onClick={handleAddPhase}>
                        <Plus size={16} className="me-2" />
                        Añadir Primera Fase
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      {editedProject.fases.map((fase) => (
                        <div key={fase.id} className="card">
                          <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center gap-2">
                                <button 
                                  className="btn btn-link p-0 text-decoration-none"
                                  onClick={() => togglePhase(fase.id)}
                                >
                                  {expandedPhases.includes(fase.id) ? (
                                    <ChevronDown size={16} />
                                  ) : (
                                    <ChevronRight size={16} />
                                  )}
                                </button>
                                <h4 className="h6 mb-0">{fase.nombre}</h4>
                                {getEstadoBadge(fase.estado)}
                              </div>
                              <div className="dropdown">
                                <button 
                                  className="btn btn-link text-decoration-none" 
                                  type="button" 
                                  data-bs-toggle="dropdown"
                                >
                                  <MoreHorizontal size={16} />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <button 
                                      className="dropdown-item" 
                                      onClick={() => handleEditPhase(fase)}
                                    >
                                      <Edit size={16} className="me-2" />
                                      Editar Fase
                                    </button>
                                  </li>
                                  <li>
                                    <button 
                                      className="dropdown-item" 
                                      onClick={() => handleAddCheckpoint(fase.id)}
                                    >
                                      <Plus size={16} className="me-2" />
                                      Añadir Checkpoint
                                    </button>
                                  </li>
                                  <li><hr className="dropdown-divider" /></li>
                                  <li>
                                    <button 
                                      className="dropdown-item text-danger" 
                                      onClick={() => setDeleteConfirm({ type: "phase", id: fase.id })}
                                    >
                                      <Trash2 size={16} className="me-2" />
                                      Eliminar Fase
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <p className="text-muted mb-1 mt-2">{fase.descripcion}</p>
                            <div className="d-flex gap-3 text-muted small">
                              <div className="d-flex align-items-center gap-1">
                                <Calendar size={14} />
                                <span>
                                  {fase.fechaInicio} - {fase.fechaFin}
                                </span>
                              </div>
                              <span>Progreso: {fase.progreso}%</span>
                            </div>
                          </div>

                          {expandedPhases.includes(fase.id) && (
                            <div className="card-body">
                              {fase.checkpoints.length === 0 ? (
                                <div className="text-center py-3 text-muted">
                                  <p>No hay checkpoints en esta fase</p>
                                  <button
                                    className="btn btn-outline-secondary btn-sm mt-2"
                                    onClick={() => handleAddCheckpoint(fase.id)}
                                  >
                                    <Plus size={14} className="me-2" />
                                    Añadir Primer Checkpoint
                                  </button>
                                </div>
                              ) : (
                                <div className="d-flex flex-column gap-3">
                                  {fase.checkpoints.map((checkpoint) => (
                                    <div key={checkpoint.id} className="border rounded p-3">
                                      <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-column gap-1">
                                          <div className="d-flex align-items-center gap-2">
                                            <h5 className="small fw-medium mb-0">{checkpoint.nombre}</h5>
                                            {getEstadoBadge(checkpoint.estado)}
                                          </div>
                                          <p className="text-muted small mb-0">{checkpoint.descripcion}</p>
                                          <div className="d-flex gap-3 text-muted small">
                                            <div className="d-flex align-items-center gap-1">
                                              <Calendar size={12} />
                                              <span>
                                                {checkpoint.fechaInicio} - {checkpoint.fechaFin}
                                              </span>
                                            </div>
                                            <div className="d-flex align-items-center gap-1">
                                              <User size={12} />
                                              <span>{checkpoint.responsable}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="dropdown">
                                          <button 
                                            className="btn btn-link text-decoration-none p-0" 
                                            type="button" 
                                            data-bs-toggle="dropdown"
                                          >
                                            <MoreHorizontal size={16} />
                                          </button>
                                          <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                              <button 
                                                className="dropdown-item" 
                                                onClick={() => handleEditCheckpoint(checkpoint)}
                                              >
                                                <Edit size={16} className="me-2" />
                                                Editar
                                              </button>
                                            </li>
                                            <li>
                                              <button 
                                                className="dropdown-item text-danger" 
                                                onClick={() => setDeleteConfirm({ type: "checkpoint", id: checkpoint.id })}
                                              >
                                                <Trash2 size={16} className="me-2" />
                                                Eliminar
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'documentacion' && (
                <ProjectDocumentation projectId={editedProject.id} />
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSaveProject}>
                <Save size={16} className="me-2" />
                Guardar Proyecto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar fase */}
      <div className={`modal ${editingPhase ? 'show d-block' : ''}`} tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editingPhase?.id.includes(Date.now().toString()) ? "Nueva Fase" : "Editar Fase"}
              </h5>
              <button type="button" className="btn-close" onClick={() => setEditingPhase(null)}></button>
            </div>
            <div className="modal-body">
              {editingPhase && (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="faseNombre" className="form-label">Nombre de la Fase</label>
                    <input
                      id="faseNombre"
                      className="form-control"
                      value={editingPhase.nombre}
                      onChange={(e) => setEditingPhase({ ...editingPhase, nombre: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="faseEstado" className="form-label">Estado</label>
                    <select
                      id="faseEstado"
                      className="form-select"
                      value={editingPhase.estado}
                      onChange={(e) => setEditingPhase({ ...editingPhase, estado: e.target.value as any })}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_progreso">En Progreso</option>
                      <option value="completado">Completado</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="faseFechaInicio" className="form-label">Fecha de Inicio</label>
                    <input
                      id="faseFechaInicio"
                      type="date"
                      className="form-control"
                      value={editingPhase.fechaInicio}
                      onChange={(e) => setEditingPhase({ ...editingPhase, fechaInicio: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="faseFechaFin" className="form-label">Fecha de Fin</label>
                    <input
                      id="faseFechaFin"
                      type="date"
                      className="form-control"
                      value={editingPhase.fechaFin}
                      onChange={(e) => setEditingPhase({ ...editingPhase, fechaFin: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="faseProgreso" className="form-label">Progreso (%)</label>
                    <input
                      id="faseProgreso"
                      type="number"
                      min="0"
                      max="100"
                      className="form-control"
                      value={editingPhase.progreso}
                      onChange={(e) => setEditingPhase({ ...editingPhase, progreso: Number(e.target.value) })}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="faseDescripcion" className="form-label">Descripción</label>
                    <textarea
                      id="faseDescripcion"
                      className="form-control"
                      value={editingPhase.descripcion}
                      onChange={(e) => setEditingPhase({ ...editingPhase, descripcion: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={() => setEditingPhase(null)}>
                Cancelar
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSavePhase}>
                <Save size={16} className="me-2" />
                Guardar Fase
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar checkpoint */}
      <div className={`modal ${editingCheckpoint ? 'show d-block' : ''}`} tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editingCheckpoint?.id.includes(Date.now().toString()) ? "Nuevo Checkpoint" : "Editar Checkpoint"}
              </h5>
              <button type="button" className="btn-close" onClick={() => setEditingCheckpoint(null)}></button>
            </div>
            <div className="modal-body">
              {editingCheckpoint && (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="checkpointNombre" className="form-label">Nombre del Checkpoint</label>
                    <input
                      id="checkpointNombre"
                      className="form-control"
                      value={editingCheckpoint.nombre}
                      onChange={(e) => setEditingCheckpoint({ ...editingCheckpoint, nombre: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="checkpointEstado" className="form-label">Estado</label>
                    <select
                      id="checkpointEstado"
                      className="form-select"
                      value={editingCheckpoint.estado}
                      onChange={(e) => setEditingCheckpoint({ ...editingCheckpoint, estado: e.target.value as any })}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_progreso">En Progreso</option>
                      <option value="completado">Completado</option>
                      <option value="retrasado">Retrasado</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="checkpointFechaInicio" className="form-label">Fecha de Inicio</label>
                    <input
                      id="checkpointFechaInicio"
                      type="date"
                      className="form-control"
                      value={editingCheckpoint.fechaInicio}
                      onChange={(e) => setEditingCheckpoint({ ...editingCheckpoint, fechaInicio: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="checkpointFechaFin" className="form-label">Fecha de Fin</label>
                    <input
                      id="checkpointFechaFin"
                      type="date"
                      className="form-control"
                      value={editingCheckpoint.fechaFin}
                      onChange={(e) => setEditingCheckpoint({ ...editingCheckpoint, fechaFin: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="checkpointResponsable" className="form-label">Responsable</label>
                    <select
                      id="checkpointResponsable"
                      className="form-select"
                      value={editingCheckpoint.responsable}
                      onChange={(e) => setEditingCheckpoint({ ...editingCheckpoint, responsable: e.target.value })}
                    >
                      <option value="">Seleccionar responsable</option>
                      {responsables.map((responsable) => (
                        <option key={responsable} value={responsable}>{responsable}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="checkpointDescripcion" className="form-label">Descripción</label>
                    <textarea
                      id="checkpointDescripcion"
                      className="form-control"
                      value={editingCheckpoint.descripcion}
                      onChange={(e) => setEditingCheckpoint({ ...editingCheckpoint, descripcion: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="checkpointDocumentos" className="form-label">Documentos (separados por comas)</label>
                    <input
                      id="checkpointDocumentos"
                      className="form-control"
                      value={editingCheckpoint.documentos?.join(", ") || ""}
                      onChange={(e) =>
                        setEditingCheckpoint({
                          ...editingCheckpoint,
                          documentos: e.target.value
                            .split(",")
                            .map((doc) => doc.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="Planos.pdf, Certificado.pdf, Fotos.zip"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={() => setEditingCheckpoint(null)}>
                Cancelar
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSaveCheckpoint}>
                <Save size={16} className="me-2" />
                Guardar Checkpoint
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      <div className={`modal ${deleteConfirm ? 'show d-block' : ''}`} tabIndex={-1} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">¿Estás seguro?</h5>
              <button type="button" className="btn-close" onClick={() => setDeleteConfirm(null)}></button>
            </div>
            <div className="modal-body">
              <p>
                Esta acción eliminará {deleteConfirm?.type === "phase" ? "la fase" : "el checkpoint"} y no se puede deshacer.
                {deleteConfirm?.type === "phase" && " Todos los checkpoints de esta fase también serán eliminados."}
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                Cancelar
              </button>
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={() => {
                  if (deleteConfirm?.type === "phase") {
                    handleDeletePhase(deleteConfirm.id)
                  } else if (deleteConfirm?.type === "checkpoint") {
                    handleDeleteCheckpoint(deleteConfirm.id)
                  }
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}