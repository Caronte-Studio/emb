"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building } from "lucide-react";
import { signIn } from "next-auth/react";


function Alert({ variant, children }: { variant?: string; children: React.ReactNode }) {
  const alertClass = variant === "destructive" 
    ? "alert alert-danger" 
    : "alert alert-primary";

  return (
    <div className={`${alertClass} mb-3`}>
      {children}
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        usuario,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Ocurrió un error durante el inicio de sesión");
    } finally {
      setIsLoading(false);
    }
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
          {error && (
            <Alert variant="destructive">
              {error === "CredentialsSignin" 
                ? "Credenciales inválidas" 
                : error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">
                Usuario
              </label>
              <input
                id="usuario"
                type="text"
                className="form-control"
                placeholder="Nombre de usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
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
              <input 
                id="password" 
                type="password" 
                className="form-control" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>
        </div>
        <div className="card-footer bg-white border-0 text-center">
          {/* Puedes añadir enlaces adicionales aquí si es necesario */}
        </div>
      </div>
    </div>
  );
}