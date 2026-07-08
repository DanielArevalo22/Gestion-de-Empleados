import type { EmpleadoProyecto } from './empleado-proyecto.model';

export interface Proyecto {
  idProyecto: number;
  proyecto: string;
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
  presupuesto: number;
  empleadoProyectos?: EmpleadoProyecto[];
}
