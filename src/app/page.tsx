import { redirect } from "next/navigation"

export default function Home() {
  // Hay que verificar la autenticación si no redigir al login
  // Si está autenticado, lo redirigimos al dashboard

  redirect("/dashboard")
}
