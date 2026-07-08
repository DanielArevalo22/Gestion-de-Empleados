import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { EmpleadoProyecto } from '../../models/empleado-proyecto.model';
import { EmpleadoProyectoService } from '../../services/empleado-proyecto';

@Component({
  selector: 'app-recent-assignments',
  imports: [NgFor],
  templateUrl: './recent-assignments.html',
  styleUrl: './recent-assignments.css',
})
export class RecentAssignments implements OnInit {
  private readonly empleadoProyectoService = inject(EmpleadoProyectoService);

  protected readonly asignaciones = signal<EmpleadoProyecto[]>([]);

  ngOnInit(): void {
    this.empleadoProyectoService.getAll().subscribe({
      next: (asignaciones) => {
        this.asignaciones.set(
          [...asignaciones].sort((a, b) => b.fechaAsignacion.localeCompare(a.fechaAsignacion)).slice(0, 5),
        );
      },
      error: (err) => console.error('No se pudo cargar las asignaciones', err),
    });
  }
}
