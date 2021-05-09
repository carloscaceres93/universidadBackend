import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Detalle } from '../model/detalle';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  private path: string = environment.urlApi + '/detalle';
  constructor(
    private http: HttpClient
  ) { }

  public listarTipoIdentificacion(){
    return this.http.get<Detalle[]>(this.path + '/listarTipoIdentificacion');
  }

  public listarTipoSagre(){
    return this.http.get<Detalle[]>(this.path + '/listarTipoSangre');
  }

}
