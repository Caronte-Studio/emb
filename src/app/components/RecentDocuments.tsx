import { useState } from "react";
import {
  FileText,
  FileImage,
  FileIcon as FilePdf,
  MoreHorizontal,
  Download,
  Trash,
  Edit,
  Eye
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: "factura" | "foto" | "garantia" | "nota";
  date: string;
  size: string;
}

interface RecentDocumentsProps {
  role: "cliente" | "operario" | "responsable" | "superadmin";
}

export function RecentDocuments({ role }: RecentDocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>([
    { id: "1", name: "Factura-2023-001.pdf", type: "factura", date: "12/04/2023", size: "245 KB" },
    { id: "2", name: "Foto-Instalacion.jpg", type: "foto", date: "15/04/2023", size: "1.2 MB" },
    { id: "3", name: "Garantia-Equipo.pdf", type: "garantia", date: "20/04/2023", size: "320 KB" },
    { id: "4", name: "Nota-Cliente.pdf", type: "nota", date: "22/04/2023", size: "120 KB" },
    { id: "5", name: "Factura-2023-002.pdf", type: "factura", date: "05/05/2023", size: "260 KB" },
  ]);

  const getIcon = (type: string) => {
    const iconProps = { size: 16 };
    switch (type) {
      case "factura":
        return <FileText {...iconProps} />;
      case "foto":
        return <FileImage {...iconProps} />;
      case "garantia":
        return <FilePdf {...iconProps} />;
      case "nota":
        return <FileText {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  const getBadge = (type: string) => {
    switch (type) {
      case "factura":
        return <span className="badge bg-primary-subtle text-primary">Factura</span>;
      case "foto":
        return <span className="badge bg-success-subtle text-success">Fotografía</span>;
      case "garantia":
        return <span className="badge bg-purple-subtle text-purple">Garantía</span>;
      case "nota":
        return <span className="badge bg-warning-subtle text-warning">Nota</span>;
      default:
        return <span className="badge bg-secondary">Documento</span>;
    }
  };

  const canEdit = role === "responsable" || role === "superadmin";

  return (
    <div className="mb-4">
      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Tamaño</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      {getIcon(doc.type)}
                      <span>{doc.name}</span>
                    </div>
                  </td>
                  <td>{getBadge(doc.type)}</td>
                  <td>{doc.date}</td>
                  <td>{doc.size}</td>
                  <td className="text-end">
                    <div className="dropdown">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <MoreHorizontal size={16} />
                        <span className="visually-hidden">Abrir menú</span>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button className="dropdown-item">
                            <Eye size={16} className="me-2" />
                            Ver
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item">
                            <Download size={16} className="me-2" />
                            Descargar
                          </button>
                        </li>
                        {canEdit && (
                          <>
                            <li>
                              <button className="dropdown-item">
                                <Edit size={16} className="me-2" />
                                Editar
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item text-danger">
                                <Trash size={16} className="me-2" />
                                Eliminar
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
  );
}
