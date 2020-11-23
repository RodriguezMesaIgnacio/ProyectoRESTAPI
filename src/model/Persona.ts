import {Schema} from 'mongoose'

export class Persona{

    private _dni : string
    private _nombre : string
    private _apellidos : string
    private _telefono : number
    private _fechaNacimiento : Date
    private _sueldo : number

    constructor(dni:string, nombre:string, apellidos:string, telefono:number, fechaNacimiento:Date, sueldo:number){
        this._dni = dni
        this._nombre = nombre
        this._apellidos = apellidos
        this._telefono = telefono
        this._fechaNacimiento = fechaNacimiento
        this._sueldo = sueldo
    }

    get dni(){
        return this._dni
    }

    set dni(dni:string){
        this._dni=dni
    }

    get nombre(){
        return this._nombre
    }

    set nombre(nombre:string){
        this._nombre=nombre
    }

    get apellidos(){
        return this._apellidos
    }

    set apellidos(apellidos:string){
        this._apellidos=apellidos
    }

    get telefono(){
        return this._telefono
    }

    set telefono(telefono:number){
        this._telefono=telefono
    }

    get fechaNacimiento(){
        return this._fechaNacimiento
    }

    set fechaNacimiento(fechaNacimiento:Date){
        this._fechaNacimiento=fechaNacimiento
    }

    get sueldo(){
        return this._sueldo
    }

    set sueldo(sueldo:number){
        this._sueldo=sueldo
    }

    edad(){
        let res = new Date().getTime() - this._fechaNacimiento.getTime()
        res=Math.floor(res/31556952000)
        return res
    }   

    imprimirPersona(){
        return `${this._nombre} ${this._apellidos} con DNI ${this._dni} cobra ${this._sueldo} € y este es su número de contacto ${this._telefono}`
    }

}


export const personaSchema = new Schema({
    _dni: {type: String, unique: true},
    _nombre: {type: String},
    _apellidos: {type: String},
    _telefono : {type : Number},
    _fechaNacimiento : {type: Date},
    _sueldo : {type : Number},
})