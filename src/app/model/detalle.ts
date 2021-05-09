import { Maestro } from "./maestro";

export class Detalle {
    public id: number;
    public nombre: string;
    public descripcion: string;
    public idMaestro: Maestro;

    constructor(){
        this.id = 0;
        this.nombre = " ";
        this.descripcion = " ";
        this.idMaestro = new Maestro();
    }
}
