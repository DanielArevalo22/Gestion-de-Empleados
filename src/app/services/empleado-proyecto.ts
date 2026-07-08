import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpleadoProyecto } from '../models/empleado-proyecto.model';

const API_URL = 'http://localhost:5134/api/empleadoproyecto';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoProyectoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<EmpleadoProyecto[]> {
    return this.http.get<EmpleadoProyecto[]>(API_URL);
  }

  getByEmpleadoYProyecto(idEmpleado: number, idProyecto: number): Observable<EmpleadoProyecto> {
    return this.http.get<EmpleadoProyecto>(`${API_URL}/empleado/${idEmpleado}/proyecto/${idProyecto}`);
  }

  getByEmpleado(idEmpleado: number): Observable<EmpleadoProyecto[]> {
    return this.http.get<EmpleadoProyecto[]>(`${API_URL}/empleado/${idEmpleado}`);
  }

  getByProyecto(idProyecto: number): Observable<EmpleadoProyecto[]> {
    return this.http.get<EmpleadoProyecto[]>(`${API_URL}/proyecto/${idProyecto}`);
  }

  create(asignacion: EmpleadoProyecto): Observable<EmpleadoProyecto> {
    return this.http.post<EmpleadoProyecto>(API_URL, asignacion);
  }

  updateRol(idEmpleado: number, idProyecto: number, rol: string): Observable<void> {
    return this.http.put<void>(
      `${API_URL}/empleado/${idEmpleado}/proyecto/${idProyecto}`,
      JSON.stringify(rol),
      { headers: { 'Content-Type': 'application/json' } },
    );
  }

  delete(idEmpleado: number, idProyecto: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/empleado/${idEmpleado}/proyecto/${idProyecto}`);
  }
}
