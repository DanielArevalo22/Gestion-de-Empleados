import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { EmpleadoProyecto } from '../../models/empleado-proyecto.model';
import { EmpleadoProyectoService } from '../../services/empleado-proyecto';

@Component({
  selector: 'app-assignments-table',
  imports: [NgFor],
  templateUrl: './assignments-table.html',
  styleUrl: './assignments-table.css',
})
export class AssignmentsTable implements OnInit {
  private readonly empleadoProyectoService = inject(EmpleadoProyectoService);

  protected readonly asignaciones = signal<EmpleadoProyecto[]>([]);

  ngOnInit(): void {
    this.empleadoProyectoService.getAll().subscribe({
      next: (asignaciones) => this.asignaciones.set(asignaciones),
      error: (err) => console.error('No se pudo cargar las asignaciones', err),
    });
  }
}
