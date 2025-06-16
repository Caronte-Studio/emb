"use client"

import { useState } from "react"
import { Search, Filter, Edit, Trash2, MoreHorizontal, Building, UserPlus, XCircle } from "lucide-react"

interface Usuario {
  id: string
  nombre: string
  email: string
  rol: "cliente" | "operario" | "responsable" | "superadmin"
  empresa: string
  activo: boolean
  fechaCreacion: string
}

interface Empresa {
  id: string
  nombre: string
}

export default function UsuariosPage() {
  const [role] = useState("superadmin") // Simulando el rol del usuario actual
  const [searchQuery, setSearchQuery] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Datos de ejemplo
  const empresas: Empresa[] = [
    { id: "1", nombre: "Empresa A" },
    { id: "2", nombre: "Empresa B" },
    { id: "3", nombre: "Empresa C" },
    { id: "4", nombre: "Empresa D" },
  ]

  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: "1",
      nombre: "Juan Pérez",
      email: "juan.perez@empresaa.com",
      rol: "responsable",
      empresa: "Empresa A",
      activo: true,
      fechaCreacion: "10/01/2023",
    },
    {
      id: "2",
      nombre: "María López",
      email: "maria.lopez@empresaa.com",
      rol: "operario",
      empresa: "Empresa A",
      activo: true,
      fechaCreacion: "15/01/2023",
    },
    {
      id: "3",
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@empresab.com",
      rol: "responsable",
      empresa: "Empresa B",
      activo: true,
      fechaCreacion: "20/01/2023",
    },
    {
      id: "4",
      nombre: "Ana Martínez",
      email: "ana.martinez@empresab.com",
      rol: "operario",
      empresa: "Empresa B",
      activo: false,
      fechaCreacion: "25/01/2023",
    },
    {
      id: "5",
      nombre: "Pedro Sánchez",
      email: "pedro.sanchez@empresac.com",
      rol: "cliente",
      empresa: "Empresa C",
      activo: true,
      fechaCreacion: "01/02/2023",
    },
    {
      id: "6",
      nombre: "Laura García",
      email: "laura.garcia@empresac.com",
      rol: "cliente",
      empresa: "Empresa C",
      activo: true,
      fechaCreacion: "05/02/2023",
    },
    {
      id: "7",
      nombre: "Javier Fernández",
      email: "javier.fernandez@empresad.com",
      rol: "cliente",
      empresa: "Empresa D",
      activo: true,
      fechaCreacion: "10/02/2023",
    },
    {
      id: "8",
      nombre: "Admin Sistema",
      email: "admin@gestdoc.com",
      rol: "superadmin",
      empresa: "GestDoc",
      activo: true,
      fechaCreacion: "01/01/2023",
    },
  ])

  // Verificar que solo el superadmin puede acceder
  if (role !== "superadmin") {
    return (
      <div className="d-flex flex-column min-vh-100">
        <div className="container py-4">
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <XCircle className="me-2" size={16} />
            <div>
              <h5 className="alert-heading mb-1">Acceso denegado</h5>
              <p className="mb-0">No tienes permisos para acceder a la gestión de usuarios.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleCreateUser = () => {
    setIsEditing(false)
    setCurrentUser({
      id: "",
      nombre: "",
      email: "",
      rol: "cliente",
      empresa: "",
      activo: true,
      fechaCreacion: new Date().toLocaleDateString(),
    })
    setOpenDialog(true)
  }

  const handleEditUser = (user: Usuario) => {
    setIsEditing(true)
    setCurrentUser({ ...user })
    setOpenDialog(true)
  }

  const handleDeleteUser = (user: Usuario) => {
    setCurrentUser(user)
    setOpenDeleteDialog(true)
  }

  const confirmDeleteUser = () => {
    if (currentUser) {
      setUsuarios(usuarios.filter((u) => u.id !== currentUser.id))
      setOpenDeleteDialog(false)
      setCurrentUser(null)
    }
  }

  const saveUser = () => {
    if (!currentUser) return

    if (isEditing) {
      setUsuarios(usuarios.map((u) => (u.id === currentUser.id ? currentUser : u)))
    } else {
      const newUser = {
        ...currentUser,
        id: (usuarios.length + 1).toString(),
        fechaCreacion: new Date().toLocaleDateString(),
      }
      setUsuarios([...usuarios, newUser])
    }

    setOpenDialog(false)
    setCurrentUser(null)
  }

  const getRolBadge = (rol: string) => {
    switch (rol) {
      case "superadmin":
        return <span className="badge bg-primary">SuperAdmin</span>
      case "responsable":
        return <span className="badge bg-info">Responsable</span>
      case "operario":
        return <span className="badge bg-success">Operario</span>
      case "cliente":
        return <span className="badge bg-warning text-dark">Cliente</span>
      default:
        return <span className="badge bg-secondary">Desconocido</span>
    }
  }

  return (
    <>
    

      <div className="d-flex flex-column min-vh-100">
        <div className="container py-4">
          <div className="d-flex flex-column gap-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h2 mb-0">Gestión de Usuarios</h1>
              <button className="btn btn-primary" onClick={handleCreateUser}>
                <UserPlus className="me-2" size={16} />
                Nuevo Usuario
              </button>
            </div>

            {/* Filtros */}
            <div className="row g-3">
              <div className="col-md-6">
                <div className="position-relative">
                  <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={16} />
                  <input
                    type="search"
                    className="form-control ps-5"
                    placeholder="Buscar usuarios..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex gap-2">
                  <select className="form-select" defaultValue="all">
                    <option value="all">Todos los roles</option>
                    <option value="superadmin">SuperAdmin</option>
                    <option value="responsable">Responsable</option>
                    <option value="operario">Operario</option>
                    <option value="cliente">Cliente</option>
                  </select>
                  <select className="form-select" defaultValue="all">
                    <option value="all">Todas las empresas</option>
                    {empresas.map((empresa) => (
                      <option key={empresa.id} value={empresa.id}>
                        {empresa.nombre}
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-outline-secondary">
                    <Filter size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabla de usuarios */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-1">Listado de Usuarios</h5>
                <p className="card-text text-muted mb-0">Gestiona los usuarios del sistema y sus permisos</p>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Empresa</th>
                        <th>Estado</th>
                        <th>Fecha Creación</th>
                        <th className="text-end">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                          <td className="fw-medium">{usuario.nombre}</td>
                          <td>{usuario.email}</td>
                          <td>{getRolBadge(usuario.rol)}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <Building className="text-muted" size={16} />
                              <span>{usuario.empresa}</span>
                            </div>
                          </td>
                          <td>
                            {usuario.activo ? (
                              <span className="badge bg-success">Activo</span>
                            ) : (
                              <span className="badge bg-danger">Inactivo</span>
                            )}
                          </td>
                          <td>{usuario.fechaCreacion}</td>
                          <td className="text-end">
                            <div className="dropdown">
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <MoreHorizontal size={16} />
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <button className="dropdown-item" onClick={() => handleEditUser(usuario)}>
                                    <Edit className="me-2" size={16} />
                                    Editar
                                  </button>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => handleDeleteUser(usuario)}
                                    disabled={usuario.rol === "superadmin"}
                                  >
                                    <Trash2 className="me-2" size={16} />
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

            {/* Cards de resumen */}
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6 className="card-title mb-0">Resumen de Usuarios</h6>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted">Total usuarios:</span>
                      <span className="fw-bold">{usuarios.length}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted">SuperAdmin:</span>
                      <span className="fw-bold text-primary">
                        {usuarios.filter((u) => u.rol === "superadmin").length}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted">Responsables:</span>
                      <span className="fw-bold text-info">
                        {usuarios.filter((u) => u.rol === "responsable").length}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted">Operarios:</span>
                      <span className="fw-bold text-success">
                        {usuarios.filter((u) => u.rol === "operario").length}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">Clientes:</span>
                      <span className="fw-bold text-warning">
                        {usuarios.filter((u) => u.rol === "cliente").length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h6 className="card-title mb-0">Distribución por Empresa</h6>
                  </div>
                  <div className="card-body">
                    {empresas.map((empresa) => {
                      const usuariosEmpresa = usuarios.filter((u) => u.empresa === empresa.nombre)
                      return (
                        <div key={empresa.id} className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <Building className="text-muted" size={16} />
                            <span className="fw-medium">{empresa.nombre}</span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="text-muted small">{usuariosEmpresa.length} usuarios</span>
                            <div className="d-flex gap-1">
                              <span className="badge bg-info">
                                {usuariosEmpresa.filter((u) => u.rol === "responsable").length} R
                              </span>
                              <span className="badge bg-success">
                                {usuariosEmpresa.filter((u) => u.rol === "operario").length} O
                              </span>
                              <span className="badge bg-warning text-dark">
                                {usuariosEmpresa.filter((u) => u.rol === "cliente").length} C
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal para crear/editar usuario */}
        {openDialog && (
          <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{isEditing ? "Editar Usuario" : "Crear Nuevo Usuario"}</h5>
                  <button type="button" className="btn-close" onClick={() => setOpenDialog(false)}></button>
                </div>
                <div className="modal-body">
                  <p className="text-muted mb-4">
                    {isEditing
                      ? "Modifica los datos del usuario seleccionado."
                      : "Completa los datos para crear un nuevo usuario."}
                  </p>
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="nombre" className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={currentUser?.nombre || ""}
                        onChange={(e) => setCurrentUser({ ...currentUser!, nombre: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={currentUser?.email || ""}
                        onChange={(e) => setCurrentUser({ ...currentUser!, email: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="rol" className="form-label">Rol</label>
                      <select
                        className="form-select"
                        id="rol"
                        value={currentUser?.rol}
                        onChange={(e) => setCurrentUser({ ...currentUser!, rol: e.target.value as any })}
                      >
                        <option value="cliente">Cliente</option>
                        <option value="operario">Operario</option>
                        <option value="responsable">Responsable</option>
                        <option value="superadmin">SuperAdmin</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label htmlFor="empresa" className="form-label">Empresa</label>
                      <select
                        className="form-select"
                        id="empresa"
                        value={currentUser?.empresa}
                        onChange={(e) => setCurrentUser({ ...currentUser!, empresa: e.target.value })}
                      >
                        <option value="">Seleccionar empresa</option>
                        {empresas.map((empresa) => (
                          <option key={empresa.id} value={empresa.nombre}>
                            {empresa.nombre}
                          </option>
                        ))}
                        <option value="GestDoc">GestDoc</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="activo"
                          checked={currentUser?.activo}
                          onChange={(e) => setCurrentUser({ ...currentUser!, activo: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="activo">
                          Usuario activo
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setOpenDialog(false)}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-primary" onClick={saveUser}>
                    {isEditing ? "Guardar cambios" : "Crear usuario"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmación para eliminar */}
        {openDeleteDialog && (
          <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">¿Estás seguro?</h5>
                  <button type="button" className="btn-close" onClick={() => setOpenDeleteDialog(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Esta acción eliminará al usuario <strong>{currentUser?.nombre}</strong> y no se puede deshacer.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setOpenDeleteDialog(false)}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-danger" onClick={confirmDeleteUser}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}