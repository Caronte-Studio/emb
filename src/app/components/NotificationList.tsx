"use client"

import { Bell, FileText, FileImage, FileIcon as FilePdf, Clock } from "lucide-react"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  type: "document" | "photo" | "pdf" | "system"
}

export function NotificationsList() {
  const notifications: Notification[] = [
    {
      id: "1",
      title: "Nueva factura disponible",
      description: "Se ha añadido una nueva factura a tu cuenta",
      time: "Hace 2 horas",
      type: "document",
    },
    {
      id: "2",
      title: "Fotografías actualizadas",
      description: "Se han añadido nuevas fotografías de tu proyecto",
      time: "Hace 1 día",
      type: "photo",
    },
    {
      id: "3",
      title: "Garantía disponible",
      description: "Tu garantía de instalación está disponible",
      time: "Hace 3 días",
      type: "pdf",
    },
    {
      id: "4",
      title: "Actualización de sistema",
      description: "El sistema ha sido actualizado con nuevas funcionalidades",
      time: "Hace 1 semana",
      type: "system",
    },
  ]

  const getIcon = (type: string) => {
    const iconSize = 20
    switch (type) {
      case "document":
        return <FileText size={iconSize} color="#0d6efd" /> // Bootstrap primary
      case "photo":
        return <FileImage size={iconSize} color="#198754" /> // Bootstrap success
      case "pdf":
        return <FilePdf size={iconSize} color="#dc3545" />   // Bootstrap danger
      case "system":
        return <Bell size={iconSize} color="#fd7e14" />       // Bootstrap warning
      default:
        return <Bell size={iconSize} />
    }
  }

  return (
    <div className="d-flex flex-column gap-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="d-flex align-items-start gap-3 border rounded p-3 bg-body-tertiary hover-shadow"
          style={{ cursor: "pointer" }}
        >
          <div className="pt-1">{getIcon(notification.type)}</div>
          <div className="d-flex flex-column">
            <p className="mb-1 fw-semibold small">{notification.title}</p>
            <p className="mb-1 text-muted small">{notification.description}</p>
            <div className="d-flex align-items-center pt-1">
              <Clock size={12} className="me-1 text-muted" />
              <span className="text-muted small">{notification.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
