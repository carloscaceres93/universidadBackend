import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Detalle } from '../model/detalle';
import { Estudiante } from '../model/estudiante';
import { DetalleService } from '../service/detalle.service';
import { EstudianteService } from '../service/estudiante.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-guardar-estudiante',
  templateUrl: './guardar-estudiante.component.html',
  styleUrls: ['./guardar-estudiante.component.css']
})
export class GuardarEstudianteComponent implements OnInit {

  public formEstudiante: FormGroup;
  public selectTipoIdentificacion: Detalle[] = [];
  public selectTipoSangre: Detalle[] = [];

  constructor(
    private serviceDetalle: DetalleService,
    private serviceEstudiante: EstudianteService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<GuardarEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }

  ) { }

  ngOnInit(): void {
    this.iniFormEstudiante();
    this.cargarTipoIdentificacion();
    this.cargarTipoSangre();
    this.cargarDatosEdicion();
  }

  private iniFormEstudiante() {
    this.formEstudiante = new FormGroup({
      idTipoIdentificacion: new FormControl(null, Validators.required),
      numeroIdentificacion: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      fechaNacimiento: new FormControl(null, Validators.required),
      idTipoSangre: new FormControl(null, Validators.required)
    });
  }

  private cargarTipoIdentificacion() {
    this.serviceDetalle.listarTipoIdentificacion().subscribe(res => {
      this.selectTipoIdentificacion = res;
    }, error => {
      console.log('Ha ocurrido un error al cargar la lista de identificacion', error);
    });
  }

  private cargarTipoSangre() {
    this.serviceDetalle.listarTipoSagre().subscribe(res => {
      this.selectTipoSangre = res;
    }, error => {
      console.log('Ha ocurrido un error al cargar la lista de tipo de sangre', error);
    });
  }

  public guardarOrActualizar() {
    let idTipoIdentificacion: Detalle = new Detalle();
    idTipoIdentificacion.id = this.formEstudiante.controls['idTipoIdentificacion'].value;

    let idTipoSangre: Detalle = new Detalle();
    idTipoSangre.id = this.formEstudiante.controls['idTipoSangre'].value;

    let estudiante: Estudiante = new Estudiante();
    estudiante.tipoIdentificacion = idTipoIdentificacion;
    estudiante.numeroIdentificacion = this.formEstudiante.controls['numeroIdentificacion'].value;
    estudiante.nombre = this.formEstudiante.controls['nombre'].value;
    estudiante.apellido = this.formEstudiante.controls['apellido'].value;
    estudiante.fechaNacimiento = this.formEstudiante.controls['fechaNacimiento'].value;
    estudiante.tipoSangre = idTipoSangre;

    if (this.data.id != 0) {
      estudiante.id = this.data.id;
      this.actualizar(estudiante);
    } else {
      this.registrar(estudiante);
    }
  }

  private registrar(estudiante: Estudiante) {
    this.serviceEstudiante.registrar(estudiante).subscribe(res => {
      this.toastr.success('El estudiante ha sido guardado con exito', 'Estudiante guardado');
      this.dialogRef.close(true);
    }, error => {
      console.log('Ha ocurrido un error al guardar el estudiante', error);
    });

  }

  private cargarDatosEdicion() {
    if (this.data.id != 0) {
      this.serviceEstudiante.listarPorId(this.data.id).subscribe(res => {

        this.formEstudiante.setValue({
          idTipoIdentificacion: res.tipoIdentificacion.id,
          numeroIdentificacion: res.numeroIdentificacion,
          nombre: res.nombre,
          apellido: res.apellido,
          fechaNacimiento: new Date(`${res.fechaNacimiento} 00:00:00`),
          idTipoSangre: res.tipoSangre.id
        });
      }, error => {
        console.log("Ha ocurrido un error al cargar la lista en el modal", error);
      })
    }
  }
  
  private actualizar(estudiante: Estudiante) {
    this.serviceEstudiante.actualizar(estudiante).subscribe(res => {
      this.toastr.success('El estudiante ha sido actualizado con exito', 'Estudiante actualizado');
      this.dialogRef.close(true);
    }, error => {
      console.log('Ha ocurrido un error al actualizar el estudiante', error);
    });

  }
}
