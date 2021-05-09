import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EnfermedadEstudiante } from '../model/enfermedad-estudiante';
import { Estudiante } from '../model/estudiante';
import { EnfermedadEstudianteService } from '../service/enfermedad-estudiante.service';
import { EstudianteService } from '../service/estudiante.service';

@Component({
  selector: 'app-guardar-enfermedades',
  templateUrl: './guardar-enfermedades.component.html',
  styleUrls: ['./guardar-enfermedades.component.css']
})
export class GuardarEnfermedadesComponent implements OnInit {

  public formEnfermedad: FormGroup;
  public listaEstudiantes: Estudiante[] = [];

  constructor(
    private serviceEstudiante: EstudianteService,
    private serviceEnfermedadEstudiante:EnfermedadEstudianteService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<GuardarEnfermedadesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) { }

  ngOnInit(): void {
    this.initFormEnfermdedades();
    this.cargarEstudiantes();
    this.cargarDatosEdicion();
  }

  private initFormEnfermdedades(){
    this.formEnfermedad = new FormGroup({
      idEstudiante: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      observaciones: new FormControl(null, Validators.required)
    })
  }

  private cargarEstudiantes(){
    this.serviceEstudiante.listarTodos().subscribe(res =>{
      this.listaEstudiantes = res;
    }, error =>{
      console.log("Ha ocurrido un error al cargar los estudiantes", error);
    })
  }

  public guardarOrActualizar(){
    let idEstudiante: Estudiante = new Estudiante();
    idEstudiante.id = this.formEnfermedad.controls['idEstudiante'].value;

    let enfermdadEstudiante: EnfermedadEstudiante = new EnfermedadEstudiante();
    enfermdadEstudiante.estudiante = idEstudiante;
    enfermdadEstudiante.nombre = this.formEnfermedad.controls['nombre'].value;
    enfermdadEstudiante.observacion = this.formEnfermedad.controls['observaciones'].value;
    

    if(this.data.id !=0){
      enfermdadEstudiante.id = this.data.id;
      this.actualizar(enfermdadEstudiante);
    }else{
      this.registrar(enfermdadEstudiante);
    }
  }

  private registrar(enfermdadEstudiante: EnfermedadEstudiante){
    this.serviceEnfermedadEstudiante.registrar(enfermdadEstudiante).subscribe(res=>{
      this.toastr.success('El registro se ha guardado con exito','Registro Guardado');
      this.dialogRef.close(true);
    }, error=>{
      console.log('ha ocurrido un error al guardar la enfermedad');
    });
  }

  private cargarDatosEdicion(){
    if(this.data.id !=0){
      this.serviceEnfermedadEstudiante.listarPorId(this.data.id).subscribe(res=>{
        
        this.formEnfermedad.setValue({
          idEstudiante: res.estudiante.id, 
          nombre: res.nombre,
          observaciones: res.observacion
        })
      },error =>{
        console.log('Ha ocurrido un error al cargar los datos', error);
      })
    }
  }

  private actualizar(enfermdadEstudiante: EnfermedadEstudiante){
    this.serviceEnfermedadEstudiante.actualizar(enfermdadEstudiante).subscribe(res=>{
      this.toastr.success('El registro se actualizo con exito', 'Registro actualizado');
      this.dialogRef.close(true);
    },error =>{
      console.log('Ha ocurrido un error al actualuzar la enfermedad', error);
    })
  }
}

