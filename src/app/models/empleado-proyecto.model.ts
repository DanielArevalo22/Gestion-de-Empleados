import type { Employee } from './Employee.model';
import type { Proyecto } from './proyecto.model';

export interface EmpleadoProyecto {
  idEmpleado: number;
  empleado?: Employee;
  idProyecto: number;
  proyecto?: Proyecto;
  rol: string;
  fechaAsignacion: string;
}
