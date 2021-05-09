import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EnfermedadEstudiante } from '../model/enfermedad-estudiante';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadEstudianteService {

  private path: string = environment.urlApi + '/enfermedadEstudiante';

  constructor(
    private http: HttpClient
  ) { }

  public listarTodos() {
    return this.http.get<EnfermedadEstudiante[]>(this.path + '/listarTodos');

  }

  public listarPorId(id: number) {
    return this.http.get<EnfermedadEstudiante>(this.path + '/listarPorId', {
      params: {
        "id": id.toString()
      }
    });
  }

  public registrar(entity: EnfermedadEstudiante) {
    return this.http.post<void>(this.path + '/registrar', entity);

  }

  public actualizar(entity: EnfermedadEstudiante) {
    return this.http.put<void>(this.path + '/actualizar', entity);
  }

  public eliminar(id: number) {
    return this.http.delete<void>(this.path + '/eliminar', {
      params: {
        "id": id.toString()
      }
    });
  }

  public listarEnfermedadPorEstudiante(idEstudiante: number) {
    return this.http.get<EnfermedadEstudiante[]>(this.path + '/listarEnfermedadPorEstudiante', {
      params: {
        "idEstudiante": idEstudiante.toString()
      }
    })
  }
}
