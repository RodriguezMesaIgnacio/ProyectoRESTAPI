import {Schema, model} from 'mongoose'

export class Ordenador{

    private _nombre : string
    private _precio : number
    private _marca : string
    private _fechaCompra : Date
    private _ultActualizacion: Date
    private _operativo : boolean


    //En el constructor ponemos por defecto la fecha de hoy en el atributo ultActualizacion
    constructor(nombre:string, precio:number, marca:string, fechaCompra:Date, operativo:boolean){
        this._nombre = nombre
        this._precio = precio
        this._marca = marca
        this._fechaCompra = fechaCompra
        this._ultActualizacion = new Date()
        this._operativo = operativo
    }

    //Cada vez que hagamos el Set de algún atributo cambiaremos la ultActualizacion al día de hoy

    get nombre(){
        return this._nombre
    }

    set nombre(nombre:string){
        this._nombre=nombre
        this._ultActualizacion=new Date()
    }

    get precio(){
        return this._precio
    }

    set precio(precio:number){
        this._precio=precio
        this._ultActualizacion=new Date()
    }

    get marca(){
        return this._marca
    }

    set marca(marca:string){
        this._marca=marca
        this._ultActualizacion=new Date()
    }

    get fechaCompra(){
        return this._fechaCompra
    }

    set fechaCompra(fechaCompra:Date){
        this._fechaCompra=fechaCompra
        this._ultActualizacion=new Date()
    }

    get ultActualizacion(){
        return this._ultActualizacion
    }

    set ultActualizacion(ultActualizacion:Date){
        this._ultActualizacion=ultActualizacion
    }

    get operativo(){
        return this._operativo
    }

    set operativo(operativo:boolean){
        this._operativo=operativo
        this._ultActualizacion=new Date()
    }

    reparar(){
        if(!this._operativo){
            this._operativo=true
            return "El PC fue reparado"
        }else{
            return "Este PC funciona correctamente"
        }
    }

    imprimirOrdenador(){
        if(this.operativo){
            return `El ordenador ${this._nombre} vale ${this._precio} es de la marca ${this._marca} y funciona correctamente`
        } else {
            return `El ordenador ${this._nombre} vale ${this._precio} es de la marca ${this._marca} y necesita ser reparado`
        }
    }

}

export const ordenadorSchema = new Schema({
    _nombre : {type : String},
    _precio : {type : Number},
    _marca : {type : String},
    _fechaCompra : {type : Date},
    _ultActualizacion : {type : Date},
    _operativo : {type : Boolean}
})


