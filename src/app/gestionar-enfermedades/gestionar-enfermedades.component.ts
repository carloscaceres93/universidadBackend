import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GuardarEnfermedadesComponent } from '../guardar-enfermedades/guardar-enfermedades.component';
import { ModalComfimarEliminarComponent } from '../modal-comfimar-eliminar/modal-comfimar-eliminar.component';
import { EnfermedadEstudiante } from '../model/enfermedad-estudiante';
import { Estudiante } from '../model/estudiante';
import { EnfermedadEstudianteService } from '../service/enfermedad-estudiante.service';
import { EstudianteService } from '../service/estudiante.service';

@Component({
  selector: 'app-gestionar-enfermedades',
  templateUrl: './gestionar-enfermedades.component.html',
  styleUrls: ['./gestionar-enfermedades.component.css']
})
export class GestionarEnfermedadesComponent implements OnInit {

  public listaEnfermedades: EnfermedadEstudiante[] = [];
  public idEstudiante: FormControl = new FormControl();
  public estudiantes: Estudiante[] = []; 

  constructor(
    public dialog: MatDialog,
    private serviceEnfermedadEstudiante: EnfermedadEstudianteService,
    private toast: ToastrService,
    private serviceEstudiante: EstudianteService
  ) { }

  ngOnInit(): void {
    this.listarEnfermedades();
    this.cargarEstudiantes();
  }

  public modalGestionarEnfermedadEstudiante(id: number) {
    let dialogRef = this.dialog.open(GuardarEnfermedadesComponent, {
      height: '500px',
      width: '600px',
      data: {
        id: id
      } 
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.listarEnfermedades();
      }
    })
  }

  public eliminar(id: number) {
    let dialogRef = this.dialog.open(ModalComfimarEliminarComponent, {
      height: '200px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.serviceEnfermedadEstudiante.eliminar(id).subscribe(res => {
          this.toast.success("El registro ha sido eliminado con exito", "Eliminado");
          this.listarEnfermedades();
        }, error => {
          console.log("ha ocurrido un error al eliminar el regitro", error);
        })

      }
    })
  }

  public listarEnfermedades(){
    this.serviceEnfermedadEstudiante.listarTodos().subscribe(res=>{
      this.listaEnfermedades = res;
    },error=>{
      console.log('Ha ocurrido un error al listar las enfermades', error)
    })
  }

  private cargarEstudiantes(){
    this.serviceEstudiante.listarTodos().subscribe(res=>{
      this.estudiantes = res;
    },error =>{
      console.log('Ha ocurrido un error al cargar los estudiantes')
    })
  }
  
  public filtrarEnfermedad(){
    this.serviceEnfermedadEstudiante.listarEnfermedadPorEstudiante(this.idEstudiante.value).subscribe(res=>{
      this.listaEnfermedades = res;
    }, error=>{
      console.log('Ha ocurrido un error al cargar el filtro');
    })
  }
}