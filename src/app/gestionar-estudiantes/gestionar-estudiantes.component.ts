import { Component, OnInit } from '@angular/core';
import { GuardarEstudianteComponent } from '../guardar-estudiante/guardar-estudiante.component';
import { Detalle } from '../model/detalle';
import { MatDialog } from '@angular/material/dialog';
import { Estudiante } from '../model/estudiante';
import { EstudianteService } from '../service/estudiante.service';
import { ModalComfimarEliminarComponent } from '../modal-comfimar-eliminar/modal-comfimar-eliminar.component';
import { ToastrService } from 'ngx-toastr';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gestionar-estudiantes',
  templateUrl: './gestionar-estudiantes.component.html',
  styleUrls: ['./gestionar-estudiantes.component.css']
})
export class GestionarEstudiantesComponent implements OnInit {

  faUserPlus = faUserPlus;

  public listaTipoDocumento: Detalle[] = [];
  public listaEstudiante: Estudiante[] = [];

  constructor(
    public dialog: MatDialog,
    private sericeEstudiante: EstudianteService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.listarEstudiantes();
  }

  public modalGestionarEstudiante(id: number) {
    let dialogRef = this.dialog.open(GuardarEstudianteComponent, {
      height: '700px',
      width: '800px',
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.listarEstudiantes();
      }
    })
  }

  public listarEstudiantes() {
    this.sericeEstudiante.listarTodos().subscribe(res => {
      this.listaEstudiante = res;
    }, error => {
      console.log("Ha ocurrido un error al listar los estudiantes");
    });
  }

  public eliminar(id: number) {
    let dialogRef = this.dialog.open(ModalComfimarEliminarComponent, {
      height: '200px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.sericeEstudiante.eliminar(id).subscribe(res => {
          this.toast.success("El registro ha sido eliminado con exito", "Eliminado");
          this.listarEstudiantes();
        }, error => {
          console.log("ha ocurrido un error al eliminar el estudiante", error);
        })
      }
    })
  }
}