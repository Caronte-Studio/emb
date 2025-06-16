"use client"

import ProjectDocumentation from "../components/ProjectDocumentation"

export default function DocumentosPage() {
  return (
    <div className="container mx-auto p-6">
      <ProjectDocumentation projectId="current-project" />
    </div>
  )
}
