"use client";

import React, { useState, useRef } from "react";
import {
  File,
  FileText,
  ImageIcon,
  Archive,
  FileSpreadsheet,
  FileVideo,
  FileAudio,
  Edit,
  CheckCircle,
  Clock,
  FolderOpen,
  Upload,
  Eye,
  Trash2,
  MoreHorizontal,
  FolderPlus,
  Search,
  Lock,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
} from "lucide-react";

interface DocumentComment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  replies?: DocumentComment[];
}

interface DocumentVersion {
  id: string;
  version: string;
  uploadDate: string;
  uploadedBy: string;
  size: string;
  changes: string;
  isCurrent: boolean;
}

interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  uploadedBy: string;
  folderId: string;
  url?: string;
  description?: string;
  tags: string[];
  isFavorite: boolean;
  isLocked: boolean;
  status: "draft" | "review" | "approved" | "archived";
  comments: DocumentComment[];
  versions: DocumentVersion[];
  sharedWith: string[];
  lastModified: string;
  checksum?: string;
}

interface DocumentFolder {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  createdDate: string;
  documentsCount: number;
  isLocked: boolean;
  color?: string;
}

interface ProjectDocumentationProps {
  projectId: string;
}

export default function ProjectDocumentation({ projectId }: ProjectDocumentationProps) {
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<{ type: "file" | "folder"; id: string } | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [sortBy, setSortBy] = useState<"name" | "date" | "size" | "type">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedFile, setSelectedFile] = useState<DocumentFile | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderDescription, setNewFolderDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [dragOver, setDragOver] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [shareEmail, setShareEmail] = useState("");
  const [activeTab, setActiveTab] = useState("preview");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Datos de ejemplo expandidos
  const folders: DocumentFolder[] = [
    {
      id: "facturas",
      name: "Facturas",
      description: "Todas las facturas relacionadas con el proyecto",
      parentId: "root",
      createdDate: "2023-10-01",
      documentsCount: 8,
      isLocked: false,
      color: "success",
    },
    {
      id: "contratos",
      name: "Contratos",
      description: "Contratos y acuerdos legales",
      parentId: "root",
      createdDate: "2023-10-01",
      documentsCount: 5,
      isLocked: true,
      color: "primary",
    },
    {
      id: "planos",
      name: "Planos y Diseños",
      description: "Planos técnicos, diseños y esquemas",
      parentId: "root",
      createdDate: "2023-10-01",
      documentsCount: 12,
      isLocked: false,
      color: "secondary",
    },
    {
      id: "fotos",
      name: "Fotografías",
      description: "Fotos del progreso y documentación visual",
      parentId: "root",
      createdDate: "2023-10-01",
      documentsCount: 35,
      isLocked: false,
      color: "warning",
    },
    {
      id: "certificados",
      name: "Certificados",
      description: "Certificados de calidad, garantías y homologaciones",
      parentId: "root",
      createdDate: "2023-10-01",
      documentsCount: 7,
      isLocked: false,
      color: "info",
    },
    {
      id: "comunicaciones",
      name: "Comunicaciones",
      description: "Emails, cartas y comunicaciones oficiales",
      parentId: "root",
      createdDate: "2023-10-01",
      documentsCount: 18,
      isLocked: false,
      color: "danger",
    },
  ];

  const files: DocumentFile[] = [
    // Facturas
    {
      id: "f1",
      name: "Factura_001_Materiales.pdf",
      type: "application/pdf",
      size: "2.4 MB",
      uploadDate: "2023-11-15",
      uploadedBy: "Juan Pérez",
      folderId: "facturas",
      description: "Factura de materiales eléctricos para la instalación principal",
      tags: ["factura", "materiales", "eléctrico"],
      isFavorite: true,
      isLocked: false,
      status: "approved",
      lastModified: "2023-11-15",
      sharedWith: ["María López", "Carlos Rodríguez"],
      comments: [
        {
          id: "c1",
          author: "María López",
          content: "Factura revisada y aprobada. Proceder con el pago.",
          timestamp: "2023-11-16 10:30",
        },
        {
          id: "c2",
          author: "Carlos Rodríguez",
          content: "Confirmo recepción de materiales según factura.",
          timestamp: "2023-11-16 14:20",
        },
      ],
      versions: [
        {
          id: "v1",
          version: "1.0",
          uploadDate: "2023-11-15",
          uploadedBy: "Juan Pérez",
          size: "2.4 MB",
          changes: "Versión inicial",
          isCurrent: true,
        },
      ],
    },
    {
      id: "f2",
      name: "Factura_002_Mano_Obra.pdf",
      type: "application/pdf",
      size: "1.8 MB",
      uploadDate: "2023-11-20",
      uploadedBy: "María López",
      folderId: "facturas",
      description: "Factura de mano de obra especializada - Semana 3",
      tags: ["factura", "mano-obra", "semana-3"],
      isFavorite: false,
      isLocked: false,
      status: "review",
      lastModified: "2023-11-20",
      sharedWith: ["Juan Pérez"],
      comments: [
        {
          id: "c3",
          author: "Juan Pérez",
          content: "Revisar horas extras reportadas.",
          timestamp: "2023-11-21 09:15",
        },
      ],
      versions: [
        {
          id: "v2",
          version: "1.0",
          uploadDate: "2023-11-20",
          uploadedBy: "María López",
          size: "1.8 MB",
          changes: "Versión inicial",
          isCurrent: true,
        },
      ],
    },
    // Root files
    {
      id: "r1",
      name: "Memoria_Proyecto.pdf",
      type: "application/pdf",
      size: "12.5 MB",
      uploadDate: "2023-10-01",
      uploadedBy: "Director Proyecto",
      folderId: "root",
      description: "Memoria técnica completa del proyecto - Documento maestro",
      tags: ["memoria", "técnica", "proyecto", "maestro"],
      isFavorite: true,
      isLocked: true,
      status: "approved",
      lastModified: "2023-10-01",
      sharedWith: ["Equipo Completo"],
      comments: [
        {
          id: "c6",
          author: "Arquitecto Principal",
          content: "Memoria técnica completa y detallada. Excelente trabajo.",
          timestamp: "2023-10-02 09:30",
        },
      ],
      versions: [
        {
          id: "v7",
          version: "1.0",
          uploadDate: "2023-10-01",
          uploadedBy: "Director Proyecto",
          size: "12.5 MB",
          changes: "Versión inicial",
          isCurrent: true,
        },
      ],
    },
  ];

  const currentFolder = folders.find((f) => f.id === currentFolderId);
  const currentFolders = folders.filter((f) => f.parentId === currentFolderId);
  const currentFiles = files.filter((f) => f.folderId === currentFolderId);

  // Filtros y ordenación
  const filteredFiles = currentFiles
    .filter((file) => {
      const matchesSearch =
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = filterType === "all" || file.type.includes(filterType);
      const matchesStatus = filterStatus === "all" || file.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "date":
          comparison = new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
          break;
        case "size":
          comparison = Number.parseFloat(a.size) - Number.parseFloat(b.size);
          break;
        case "type":
          comparison = a.type.localeCompare(b.type);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const getFileIcon = (type: string, size: "sm" | "md" | "lg" = "md") => {
    const sizeClass = size === "sm" ? 16 : size === "lg" ? 48 : 32;

    if (type.startsWith("image/")) return <ImageIcon size={sizeClass} className="text-primary" />;
    if (type.includes("pdf")) return <FileText size={sizeClass} className="text-danger" />;
    if (type.includes("excel") || type.includes("spreadsheet")) return <FileSpreadsheet size={sizeClass} className="text-success" />;
    if (type.includes("video")) return <FileVideo size={sizeClass} className="text-info" />;
    if (type.includes("audio")) return <FileAudio size={sizeClass} className="text-warning" />;
    if (type.includes("zip") || type.includes("rar")) return <Archive size={sizeClass} className="text-secondary" />;
    return <File size={sizeClass} className="text-muted" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="badge bg-success d-inline-flex align-items-center">
            <CheckCircle size={12} className="me-1" />
            Aprobado
          </span>
        );
      case "review":
        return (
          <span className="badge bg-warning d-inline-flex align-items-center">
            <Clock size={12} className="me-1" />
            En Revisión
          </span>
        );
      case "draft":
        return (
          <span className="badge bg-secondary d-inline-flex align-items-center">
            <Edit size={12} className="me-1" />
            Borrador
          </span>
        );
      case "archived":
        return (
          <span className="badge bg-danger d-inline-flex align-items-center">
            <Archive size={12} className="me-1" />
            Archivado
          </span>
        );
      default:
        return null;
    }
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const fileId = `upload_${Date.now()}_${file.name}`;
      setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }));

      // Simular progreso de subida
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const currentProgress = prev[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setUploadProgress((prev) => {
                const { [fileId]: _, ...rest } = prev;
                return rest;
              });
            }, 1000);
            return prev;
          }
          return { ...prev, [fileId]: currentProgress + 10 };
        });
      }, 200);
    });

    setUploadDialogOpen(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: DocumentFolder = {
      id: `folder_${Date.now()}`,
      name: newFolderName,
      description: newFolderDescription,
      parentId: currentFolderId,
      createdDate: new Date().toISOString().split("T")[0],
      documentsCount: 0,
      isLocked: false,
    };

    console.log("Nueva carpeta:", newFolder);
    setNewFolderName("");
    setNewFolderDescription("");
    setNewFolderDialogOpen(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedFile) return;

    const comment: DocumentComment = {
      id: `comment_${Date.now()}`,
      author: "Usuario Actual",
      content: newComment,
      timestamp: new Date().toLocaleString("es-ES"),
    };

    console.log("Nuevo comentario:", comment);
    setNewComment("");
  };

  const handleShare = () => {
    if (!shareEmail.trim() || !selectedFile) return;

    console.log(`Compartir archivo ${selectedFile.name} con ${shareEmail}`);
    setShareEmail("");
    setShareDialogOpen(false);
  };

  const toggleFavorite = (fileId: string) => {
    console.log(`Toggle favorite para archivo: ${fileId}`);
  };

  const getBreadcrumb = () => {
    const breadcrumb = ["Documentación"];
    let folder = currentFolder;
    while (folder && folder.parentId !== "root") {
      breadcrumb.unshift(folder.name);
      //   folder = folders.find((f) => f.id === folder.parentId)
    }
    return breadcrumb;
  };

  return (
    <>
      <div className="container-fluid py-4" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
        {/* Header con breadcrumb y acciones */}
        <div className="row align-items-center mb-4">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                {getBreadcrumb().map((item, index) => (
                  <li key={index} className={`breadcrumb-item ${index === getBreadcrumb().length - 1 ? "active fw-medium" : ""}`}>
                    {index === getBreadcrumb().length - 1 ? item : <span>{item}</span>}
                  </li>
                ))}
              </ol>
            </nav>
            <h3 className="mb-1">{currentFolderId === "root" ? "Documentación del Proyecto" : currentFolder?.name}</h3>
            {currentFolder?.description && <p className="text-muted mb-0">{currentFolder.description}</p>}
          </div>
          <div className="col-auto">
            <div className="btn-group">
              <button className="btn btn-outline-primary" onClick={() => setNewFolderDialogOpen(true)}>
                <FolderPlus size={16} className="me-2" />
                Nueva Carpeta
              </button>
              <button className="btn btn-primary" onClick={() => setUploadDialogOpen(true)}>
                <Upload size={16} className="me-2" />
                Subir Archivos
              </button>
            </div>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="row mb-4">
          <div className="col-md-6 col-lg-4 mb-3 mb-md-0">
            <div className="input-group">
              <span className="input-group-text">
                <Search size={16} />
              </span>
              <input
                type="search"
                className="form-control"
                placeholder="Buscar archivos y carpetas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-8">
            <div className="row g-2">
              <div className="col-auto">
                <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="all">Todos los tipos</option>
                  <option value="pdf">PDF</option>
                  <option value="image">Imágenes</option>
                  <option value="excel">Excel</option>
                  <option value="dwg">Planos (DWG)</option>
                </select>
              </div>
              <div className="col-auto">
                <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="all">Todos los estados</option>
                  <option value="draft">Borrador</option>
                  <option value="review">En Revisión</option>
                  <option value="approved">Aprobado</option>
                  <option value="archived">Archivado</option>
                </select>
              </div>
              <div className="col-auto">
                <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
                  <option value="name">Nombre</option>
                  <option value="date">Fecha</option>
                  <option value="size">Tamaño</option>
                  <option value="type">Tipo</option>
                </select>
              </div>
              <div className="col-auto">
                <button className="btn btn-outline-secondary" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                  {sortOrder === "asc" ? <SortAsc size={16} /> : <SortDesc size={16} />}
                </button>
              </div>
              <div className="col-auto">
                <button className="btn btn-outline-secondary" onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}>
                  {viewMode === "list" ? <Grid3X3 size={16} /> : <List size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación hacia atrás */}
        {currentFolderId !== "root" && (
          <button className="btn btn-link text-decoration-none mb-3 p-0" onClick={() => setCurrentFolderId("root")}>
            ← Volver a Documentación
          </button>
        )}

        {/* Indicadores de progreso de subida */}
        {Object.keys(uploadProgress).length > 0 && (
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Subiendo archivos...</h5>
            </div>
            <div className="card-body">
              {Object.entries(uploadProgress).map(([fileId, progress]) => (
                <div key={fileId} className="mb-3">
                  <div className="d-flex justify-content-between small mb-1">
                    <span>{fileId.split("_").pop()}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lista de carpetas */}
        {currentFolders.length > 0 && (
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Carpetas</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {currentFolders.map((folder) => (
                  <div key={folder.id} className="col-md-6 col-lg-4 mb-3">
                    <div className="card h-100 shadow-sm cursor-pointer" style={{ cursor: "pointer" }} onClick={() => setCurrentFolderId(folder.id)}>
                      <div className="card-body">
                        <div className="d-flex align-items-start justify-content-between">
                          <div className="d-flex align-items-center flex-grow-1">
                            <div className="position-relative me-3">
                              <FolderOpen size={32} className="text-primary" />
                              {folder.isLocked && <Lock size={16} className="position-absolute top-0 end-0 text-danger" />}
                            </div>
                            <div>
                              <div className="d-flex align-items-center mb-1">
                                <h6 className="card-title mb-0 me-2">{folder.name}</h6>
                                {folder.color && <span className={`badge bg-${folder.color} rounded-circle p-1`}></span>}
                              </div>
                              <p className="text-muted small mb-1">{folder.documentsCount} archivos</p>
                              {folder.description && <p className="text-muted small mb-0 text-truncate">{folder.description}</p>}
                            </div>
                          </div>
                          <div className="dropdown">
                            <button className="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" onClick={(e) => e.stopPropagation()}>
                              <MoreHorizontal size={16} />
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button className="dropdown-item" onClick={() => setCurrentFolderId(folder.id)}>
                                  <Eye size={16} className="me-2" />
                                  Abrir
                                </button>
                              </li>
                              <li>
                                <hr className="dropdown-divider" />
                              </li>
                              <li>
                                <button className="dropdown-item text-danger" onClick={() => setDeleteConfirmOpen({ type: "folder", id: folder.id })}>
                                  <Trash2 size={16} className="me-2" />
                                  Eliminar
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

       
      </div>
    </>
  );
}
