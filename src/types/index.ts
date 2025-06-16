// src/types/index.ts

export type EstadoProyecto = "en_curso" | "completado" | "pendiente";

export interface Proyecto {
  id: string;                    
  nombre: string;                
  fechaInicio: string;          
  fechaFin: string;
  progreso: number;              
  estado: EstadoProyecto;
  responsable: string;          

  // Opcionales y escalables:
  descripcion?: string;
  presupuesto?: number;
  empresaId?: number;
  usuariosAsignados?: UsuarioResumen[];
  fases?: FaseResumen[];
}

export interface UsuarioResumen {
  id: number;
  nombre: string;
  apellidos: string;
  rol: string;
}

export interface FaseResumen {
  id: number;
  nombre: string;
  progreso: number;
  checkpoints: CheckpointResumen[];
}

export interface CheckpointResumen {
  id: number;
  nombre: string;
  estado: string; // Considera luego convertir esto en enum
}
