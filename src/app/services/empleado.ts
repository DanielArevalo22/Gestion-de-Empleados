import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee.model';
import { Proyecto } from '../models/proyecto.model';

const API_URL = 'https://gestion-empleados-back-final.onrender.com/api/empleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URL);
  }

  getActivos(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_URL}/activos`);
  }

  getByDepartamento(idDepartamento: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_URL}/departamento/${idDepartamento}`);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/${id}`);
  }

  getProyectos(id: number): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${API_URL}/${id}/proyectos`);
  }

  create(empleado: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(API_URL, empleado);
  }

  update(id: number, empleado: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${API_URL}/${id}`, empleado);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
