import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestionarEstudiantesComponent } from './gestionar-estudiantes/gestionar-estudiantes.component';
import { GestionarEnfermedadesComponent } from './gestionar-enfermedades/gestionar-enfermedades.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { GuardarEstudianteComponent } from './guardar-estudiante/guardar-estudiante.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { ModalComfimarEliminarComponent } from './modal-comfimar-eliminar/modal-comfimar-eliminar.component';
import { GuardarEnfermedadesComponent } from './guardar-enfermedades/guardar-enfermedades.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    GestionarEstudiantesComponent,
    GestionarEnfermedadesComponent,
    GuardarEstudianteComponent,
    ModalComfimarEliminarComponent,
    GuardarEnfermedadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ES'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
