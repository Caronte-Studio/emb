import React from "react";
import {
  User, Mail, Phone, Building, Calendar, FileText, FolderOpen,
  BarChart3, Clock, CheckCircle, AlertCircle, Download, Eye, Edit, MessageSquare
} from "lucide-react";

export function ClientDetailsModal({ client, isOpen, onClose }: any) {
  if (!client) return null;

  const getStatusClass = (status: any) => {
    switch (status?.toLowerCase()) {
      case "activo": case "completado": case "firmado": case "pagada":
      case "vigente": case "aprobado": return "success";
      case "en progreso": case "pendiente": return "warning";
      case "inactivo": case "vencido": return "danger";
      default: return "secondary";
    }
  };

  return (
    <div className={`modal fade ${isOpen ? "show d-block" : ""}`} tabIndex={-1}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <User size={18} className="me-2" />
              Detalles del Cliente: {client.name}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* Información General */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <h5>Información General</h5>
                  <button className="btn btn-sm btn-outline-secondary">
                    <Edit size={14} className="me-1" /> Editar
                  </button>
                </div>
                <div className="row">
                  {[
                    { icon: <User size={14} />, label: "Nombre", value: client.name },
                    { icon: <Building size={14} />, label: "Empresa", value: client.company },
                    { icon: <Mail size={14} />, label: "Email", value: client.email },
                    { icon: <Phone size={14} />, label: "Teléfono", value: client.phone },
                    { icon: <Calendar size={14} />, label: "Alta", value: new Date(client.joinDate).toLocaleDateString("es-ES") },
                    { icon: <BarChart3 size={14} />, label: "Estado", value: (
                      <span className={`badge bg-${getStatusClass(client.status)}`}>{client.status}</span>
                    )},
                    { icon: <FolderOpen size={14} />, label: "Proyectos", value: client.projects },
                    { icon: <FileText size={14} />, label: "Documentos", value: client.documents },
                  ].map((item, i) => (
                    <div key={i} className="col-md-3 mb-3">
                      <small className="text-muted d-flex align-items-center">
                        {item.icon}<span className="ms-1">{item.label}</span>
                      </small>
                      <div>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs" id="clientTabs" role="tablist">
              {["projects", "documents", "activity", "statistics"].map((tab, i) => (
                <li className="nav-item" role="presentation" key={i}>
                  <button
                    className={`nav-link ${i === 0 ? "active" : ""}`}
                    id={`${tab}-tab`}
                    data-bs-toggle="tab"
                    data-bs-target={`#${tab}`}
                    type="button"
                    role="tab"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
            <div className="tab-content pt-3">
              {/* Projects */}
              <div className="tab-pane fade show active" id="projects" role="tabpanel">
                {(client.projectsData || []).map((project: any) => (
                  <div className="card mb-3 border-start border-primary border-4" key={project.id}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6>{project.name} <span className={`badge bg-${getStatusClass(project.status)}`}>{project.status}</span></h6>
                          <div className="row text-muted small mb-2">
                            <div className="col-md-3"><strong>Inicio:</strong> {project.startDate}</div>
                            <div className="col-md-3"><strong>Fin:</strong> {project.endDate}</div>
                            <div className="col-md-3"><strong>Presupuesto:</strong> {project.budget}</div>
                            <div className="col-md-3"><strong>Fase:</strong> {project.phase}</div>
                          </div>
                          <div className="d-flex justify-content-between small mb-1">
                            <span>Progreso</span><span>{project.progress}%</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{ width: `${project.progress}%` }} />
                          </div>
                        </div>
                        <div className="ms-3 d-flex flex-column gap-2">
                          <button className="btn btn-sm btn-outline-secondary">
                            <Eye size={14} className="me-1" /> Ver
                          </button>
                          <button className="btn btn-sm btn-outline-secondary">
                            <MessageSquare size={14} className="me-1" /> Comentar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Otros tabs: documents, activity, statistics */}
              {/* Puedes seguir el mismo patrón para cada tab con estructura similar */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
