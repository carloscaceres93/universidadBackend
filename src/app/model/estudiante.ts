import { Detalle } from "./detalle";

export class Estudiante {
    public id: number;
    public numeroIdentificacion: string;
    public nombre: string;
    public apellido: string;
    public fechaNacimiento: Date;
    public tipoIdentificacion: Detalle;
    public tipoSangre: Detalle;

    constructor(){
        this.id = 0;
        this.numeroIdentificacion = " ";
        this.nombre = " ";
        this.apellido = " ";
        this.fechaNacimiento = new Date();
        this.tipoIdentificacion = new Detalle();
        this.tipoSangre = new Detalle();

    }
}
