import { Employee } from './Employee.model';

export interface Departamento {
  idDepartamento: number;
  departamento: string;
  activo: boolean;
  empleados?: Employee[];
}
