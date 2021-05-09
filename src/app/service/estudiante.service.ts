import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estudiante } from '../model/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private path: string = environment.urlApi + '/estudiante';

  constructor(
    private http: HttpClient
  ) { }

  public listarTodos() {
    return this.http.get<Estudiante[]>(this.path + '/listarTodos');
  }

  public listarPorId(id: number) {
    return this.http.get<Estudiante>(this.path + "/listarPorId", {
      params: {
        "id": id.toString()
      }
    });
  }

  public registrar(estudiante: Estudiante) {
    return this.http.post<void>(this.path + '/registrar', estudiante);
  }

  public actualizar(estudiante: Estudiante) {
    return this.http.put<void>(this.path + '/actualizar', estudiante);
  }

  public eliminar(id: number) {
    return this.http.delete<void>(this.path + '/eliminar', {
      params: {
        "id": id.toString()
      }
    });
  }
}
