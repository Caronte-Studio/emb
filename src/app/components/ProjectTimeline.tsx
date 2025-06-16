"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Clock, AlertCircle, Calendar, User, FileText, Edit } from "lucide-react"
import { ProjectEditor } from "../components/ProjectEditor"

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

export function ProjectTimeline() {
  const [expandedProjects, setExpandedProjects] = useState<string[]>(["1"])
  const [expandedPhases, setExpandedPhases] = useState<string[]>(["1-1"])
  const [editingProject, setEditingProject] = useState<Proyecto | null>(null)
 const [proyectosData, setProyectosData] = useState<Proyecto[]>([
    {
      id: "1",
      nombre: "Reforma Oficina Central",
      descripcion:
        "Reforma integral de las oficinas centrales incluyendo instalaciones eléctricas, climatización y mobiliario",
      fechaInicio: "10/01/2023",
      fechaFin: "30/06/2023",
      cliente: "Empresa A",
      responsable: "Juan Pérez",
      estado: "en_curso",
      progresoTotal: 75,
      fases: [
        {
          id: "1-1",
          nombre: "Planificación y Diseño",
          descripcion: "Elaboración de planos y obtención de permisos",
          fechaInicio: "10/01/2023",
          fechaFin: "31/01/2023",
          estado: "completado",
          progreso: 100,
          checkpoints: [
            {
              id: "1-1-1",
              nombre: "Levantamiento topográfico",
              descripcion: "Medición y análisis del espacio actual",
              fechaInicio: "10/01/2023",
              fechaFin: "15/01/2023",
              estado: "completado",
              responsable: "Arquitecto Técnico",
              documentos: ["Planos actuales.pdf", "Mediciones.xlsx"],
            },
            {
              id: "1-1-2",
              nombre: "Diseño arquitectónico",
              descripcion: "Elaboración de planos y diseño de espacios",
              fechaInicio: "16/01/2023",
              fechaFin: "25/01/2023",
              estado: "completado",
              responsable: "Arquitecto Principal",
              documentos: ["Planos nuevos.pdf", "Renders 3D.zip"],
            },
            {
              id: "1-1-3",
              nombre: "Permisos y licencias",
              descripcion: "Tramitación de permisos municipales",
              fechaInicio: "26/01/2023",
              fechaFin: "31/01/2023",
              estado: "completado",
              responsable: "Gestor Administrativo",
              documentos: ["Licencia obra.pdf", "Permisos.pdf"],
            },
          ],
        },
        {
          id: "1-2",
          nombre: "Demolición y Preparación",
          descripcion: "Demolición de estructuras existentes y preparación del espacio",
          fechaInicio: "01/02/2023",
          fechaFin: "15/02/2023",
          estado: "completado",
          progreso: 100,
          checkpoints: [
            {
              id: "1-2-1",
              nombre: "Protección de áreas",
              descripcion: "Instalación de protecciones y señalización",
              fechaInicio: "01/02/2023",
              fechaFin: "03/02/2023",
              estado: "completado",
              responsable: "Jefe de Obra",
              documentos: ["Plan seguridad.pdf"],
            },
            {
              id: "1-2-2",
              nombre: "Demolición controlada",
              descripcion: "Demolición de tabiques y elementos no estructurales",
              fechaInicio: "04/02/2023",
              fechaFin: "12/02/2023",
              estado: "completado",
              responsable: "Equipo Demolición",
              documentos: ["Informe demolición.pdf", "Fotos progreso.zip"],
            },
            {
              id: "1-2-3",
              nombre: "Limpieza y retirada",
              descripcion: "Limpieza del espacio y retirada de escombros",
              fechaInicio: "13/02/2023",
              fechaFin: "15/02/2023",
              estado: "completado",
              responsable: "Equipo Limpieza",
              documentos: ["Certificado limpieza.pdf"],
            },
          ],
        },
        {
          id: "1-3",
          nombre: "Instalaciones Básicas",
          descripcion: "Instalación de fontanería, electricidad y climatización",
          fechaInicio: "16/02/2023",
          fechaFin: "31/03/2023",
          estado: "en_progreso",
          progreso: 80,
          checkpoints: [
            {
              id: "1-3-1",
              nombre: "Instalación eléctrica",
              descripcion: "Cableado y cuadros eléctricos",
              fechaInicio: "16/02/2023",
              fechaFin: "28/02/2023",
              estado: "completado",
              responsable: "Electricista Jefe",
              documentos: ["Esquema eléctrico.pdf", "Certificado instalación.pdf"],
            },
            {
              id: "1-3-2",
              nombre: "Fontanería",
              descripcion: "Instalación de tuberías y sanitarios",
              fechaInicio: "01/03/2023",
              fechaFin: "15/03/2023",
              estado: "completado",
              responsable: "Fontanero Jefe",
              documentos: ["Planos fontanería.pdf"],
            },
            {
              id: "1-3-3",
              nombre: "Climatización",
              descripcion: "Instalación de sistema de aire acondicionado",
              fechaInicio: "16/03/2023",
              fechaFin: "31/03/2023",
              estado: "en_progreso",
              responsable: "Técnico Climatización",
              documentos: ["Manual equipos.pdf"],
            },
          ],
        },
        {
          id: "1-4",
          nombre: "Acabados",
          descripcion: "Pintura, suelos y acabados finales",
          fechaInicio: "01/04/2023",
          fechaFin: "30/04/2023",
          estado: "pendiente",
          progreso: 0,
          checkpoints: [
            {
              id: "1-4-1",
              nombre: "Suelos",
              descripcion: "Instalación de pavimento",
              fechaInicio: "01/04/2023",
              fechaFin: "15/04/2023",
              estado: "pendiente",
              responsable: "Solador",
            },
            {
              id: "1-4-2",
              nombre: "Pintura",
              descripcion: "Pintura de paredes y techos",
              fechaInicio: "16/04/2023",
              fechaFin: "25/04/2023",
              estado: "pendiente",
              responsable: "Pintor",
            },
            {
              id: "1-4-3",
              nombre: "Acabados finales",
              descripcion: "Instalación de elementos decorativos",
              fechaInicio: "26/04/2023",
              fechaFin: "30/04/2023",
              estado: "pendiente",
              responsable: "Decorador",
            },
          ],
        },
        {
          id: "1-5",
          nombre: "Mobiliario y Entrega",
          descripcion: "Instalación de mobiliario y entrega final",
          fechaInicio: "01/05/2023",
          fechaFin: "30/06/2023",
          estado: "pendiente",
          progreso: 0,
          checkpoints: [
            {
              id: "1-5-1",
              nombre: "Mobiliario oficina",
              descripcion: "Instalación de mesas, sillas y armarios",
              fechaInicio: "01/05/2023",
              fechaFin: "15/05/2023",
              estado: "pendiente",
              responsable: "Montador",
            },
            {
              id: "1-5-2",
              nombre: "Equipamiento técnico",
              descripcion: "Instalación de equipos informáticos",
              fechaInicio: "16/05/2023",
              fechaFin: "31/05/2023",
              estado: "pendiente",
              responsable: "Técnico IT",
            },
            {
              id: "1-5-3",
              nombre: "Entrega y documentación",
              descripcion: "Entrega final y documentación completa",
              fechaInicio: "01/06/2023",
              fechaFin: "30/06/2023",
              estado: "pendiente",
              responsable: "Director Proyecto",
            },
          ],
        },
      ],
    },
  ])

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => (prev.includes(phaseId) ? prev.filter((id) => id !== phaseId) : [...prev, phaseId]))
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "completado":
        return <CheckCircle2 className="text-success" size={20} />
      case "en_progreso":
        return <Clock className="text-primary" size={20} />
      case "retrasado":
        return <AlertCircle className="text-danger" size={20} />
      default:
        return <Circle className="text-secondary" size={20} />
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "completado":
        return (
          <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-10">
            Completado
          </span>
        )
      case "en_progreso":
        return (
          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-10">
            En Progreso
          </span>
        )
      case "retrasado":
        return (
          <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-10">
            Retrasado
          </span>
        )
      default:
        return (
          <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-10">
            Pendiente
          </span>
        )
    }
  }

  const handleEditProject = (proyecto: Proyecto) => {
    setEditingProject(proyecto)
  }

  const handleSaveProject = (updatedProject: Proyecto) => {
    setProyectosData((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)))
  }

  return (
    <div className="d-flex flex-column gap-4">
      {proyectosData.map((proyecto) => (
        <div key={proyecto.id} className="card w-100">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-start">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-2">
                  <button 
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={() => toggleProject(proyecto.id)}
                  >
                    {expandedProjects.includes(proyecto.id) ? (
                      <i className="bi bi-chevron-down"></i>
                    ) : (
                      <i className="bi bi-chevron-right"></i>
                    )}
                  </button>
                  <h3 className="h5 mb-0">{proyecto.nombre}</h3>
                </div>
                <p className="text-muted mb-0">{proyecto.descripcion}</p>
              </div>
              <div className="d-flex flex-column align-items-end gap-2">
                <div className="d-flex align-items-center gap-2">
                  {getEstadoBadge(proyecto.estado)}
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleEditProject(proyecto)}
                  >
                    <Edit className="me-1" size={16} />
                    Editar
                  </button>
                </div>
                <small className="text-muted">Progreso: {proyecto.progresoTotal}%</small>
              </div>
            </div>
            <div className="d-flex gap-4 mt-2 text-muted small">
              <div className="d-flex align-items-center gap-1">
                <Calendar size={16} />
                <span>
                  {proyecto.fechaInicio} - {proyecto.fechaFin}
                </span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <User size={16} />
                <span>Cliente: {proyecto.cliente}</span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <User size={16} />
                <span>Responsable: {proyecto.responsable}</span>
              </div>
            </div>
          </div>

          {expandedProjects.includes(proyecto.id) && (
            <div className="card-body">
              <div className="d-flex flex-column gap-4">
                {proyecto.fases.map((fase, faseIndex) => (
                  <div key={fase.id} className="position-relative">
                    {/* Línea vertical del timeline */}
                    {faseIndex < proyecto.fases.length - 1 && (
                      <div className="position-absolute start-1 top-4 h-100 border-start" style={{width: '1px'}}></div>
                    )}

                    <div className="d-flex gap-3">
                      <div className="d-flex flex-column align-items-center">
                        {getEstadoIcon(fase.estado)}
                      </div>

                      <div className="flex-grow-1 d-flex flex-column gap-2">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-column gap-1">
                            <div className="d-flex align-items-center gap-2">
                              <button
                                className="btn btn-link p-0 text-decoration-none"
                                onClick={() => togglePhase(fase.id)}
                              >
                                {expandedPhases.includes(fase.id) ? (
                                  <i className="bi bi-chevron-down"></i>
                                ) : (
                                  <i className="bi bi-chevron-right"></i>
                                )}
                              </button>
                              <h4 className="h6 mb-0">{fase.nombre}</h4>
                              {getEstadoBadge(fase.estado)}
                            </div>
                            <p className="text-muted small mb-0">{fase.descripcion}</p>
                            <div className="d-flex gap-3 text-muted small">
                              <span>
                                {fase.fechaInicio} - {fase.fechaFin}
                              </span>
                              <span>Progreso: {fase.progreso}%</span>
                            </div>
                          </div>
                        </div>

                        {expandedPhases.includes(fase.id) && (
                          <div className="mt-2 ps-4 border-start border-2 border-light">
                            {fase.checkpoints.map((checkpoint, checkpointIndex) => (
                              <div key={checkpoint.id} className="d-flex flex-column gap-2">
                                <div className="d-flex gap-3">
                                  <div className="mt-1">{getEstadoIcon(checkpoint.estado)}</div>
                                  <div className="flex-grow-1 d-flex flex-column gap-1">
                                    <div className="d-flex justify-content-between">
                                      <h5 className="small fw-medium mb-0">{checkpoint.nombre}</h5>
                                      {getEstadoBadge(checkpoint.estado)}
                                    </div>
                                    <p className="text-muted small mb-0">{checkpoint.descripcion}</p>
                                    <div className="d-flex gap-3 text-muted small">
                                      <div className="d-flex align-items-center gap-1">
                                        <Calendar size={14} />
                                        <span>
                                          {checkpoint.fechaInicio} - {checkpoint.fechaFin}
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center gap-1">
                                        <User size={14} />
                                        <span>{checkpoint.responsable}</span>
                                      </div>
                                    </div>
                                    {checkpoint.documentos && checkpoint.documentos.length > 0 && (
                                      <div className="d-flex align-items-center gap-2 mt-2">
                                        <FileText size={14} className="text-muted" />
                                        <div className="d-flex gap-1 flex-wrap">
                                          {checkpoint.documentos.map((doc, docIndex) => (
                                            <span key={docIndex} className="badge bg-light text-dark small">
                                              {doc}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {checkpointIndex < fase.checkpoints.length - 1 && (
                                  <div className="ms-4 border-start" style={{height: '16px', width: '1px'}}></div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      {editingProject && (
        <ProjectEditor
          proyecto={editingProject}
          onSave={handleSaveProject}
          onClose={() => setEditingProject(null)}
          open={!!editingProject}
        />
      )}
    </div>
  )
}