"use client";
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // lógica de autenticación
    router.push("/dashboard");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4">
      <div className="card shadow-lg" style={{ width: "100%", maxWidth: "28rem" }}>
        <div className="card-header bg-white border-0 pt-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
            <Building className="text-primary" style={{ width: "2rem", height: "2rem" }} />
            <h1 className="card-title h2 mb-0">EMB Group</h1>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label htmlFor="password" className="form-label mb-0">
                  Contraseña
                </label>
                <Link href="/recuperar-password" className="text-decoration-none small text-primary">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <input id="password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Iniciar sesión
            </button>
          </form>
        </div>
        <div className="card-footer bg-white border-0 text-center">
          
        </div>
      </div>
    </div>
  );
}
