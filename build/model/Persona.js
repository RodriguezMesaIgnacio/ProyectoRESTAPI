"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personaSchema = exports.Persona = void 0;
const mongoose_1 = require("mongoose");
class Persona {
    constructor(dni, nombre, apellidos, telefono, fechaNacimiento, sueldo) {
        this._dni = dni;
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._telefono = telefono;
        this._fechaNacimiento = fechaNacimiento;
        this._sueldo = sueldo;
    }
    get dni() {
        return this._dni;
    }
    set dni(dni) {
        this._dni = dni;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    get apellidos() {
        return this._apellidos;
    }
    set apellidos(apellidos) {
        this._apellidos = apellidos;
    }
    get telefono() {
        return this._telefono;
    }
    set telefono(telefono) {
        this._telefono = telefono;
    }
    get fechaNacimiento() {
        return this._fechaNacimiento;
    }
    set fechaNacimiento(fechaNacimiento) {
        this._fechaNacimiento = fechaNacimiento;
    }
    get sueldo() {
        return this._sueldo;
    }
    set sueldo(sueldo) {
        this._sueldo = sueldo;
    }
    edad() {
        let res = new Date().getTime() - this._fechaNacimiento.getTime();
        res = Math.floor(res / 31556952000);
        return res;
    }
    imprimirPersona() {
        return `${this._nombre} ${this._apellidos} con DNI ${this._dni} cobra ${this._sueldo} € y este es su número de contacto ${this._telefono}`;
    }
}
exports.Persona = Persona;
exports.personaSchema = new mongoose_1.Schema({
    _dni: { type: String, unique: true },
    _nombre: { type: String },
    _apellidos: { type: String },
    _telefono: { type: Number },
    _fechaNacimiento: { type: Date },
    _sueldo: { type: Number },
});
