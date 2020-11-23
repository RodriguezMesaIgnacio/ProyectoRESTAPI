"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locales = exports.Local = void 0;
const mongoose_1 = require("mongoose");
const Ordenador_1 = require("./Ordenador");
const Persona_1 = require("./Persona");
class Local {
    constructor(nombre, direccion, encargado, ordenadores, empleados) {
        this._nombre = nombre;
        this._direccion = direccion;
        this._encargado = encargado;
        this._ordenadores = ordenadores;
        this._empleados = empleados;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    get direccion() {
        return this._direccion;
    }
    set direccion(direccion) {
        this._direccion = direccion;
    }
    get encargado() {
        return this._encargado;
    }
    set encargado(encargado) {
        this._encargado = encargado;
    }
    get ordenadores() {
        return this._ordenadores;
    }
    set ordenadores(ordenadores) {
        this._ordenadores = ordenadores;
    }
    get empleados() {
        return this._empleados;
    }
    set empleados(empleados) {
        this._empleados = empleados;
    }
    imprimirOrdenadores() {
        for (let o of this._ordenadores) {
            console.log(o.imprimirOrdenador());
        }
    }
    imprimirEmpleados() {
        for (let e of this._empleados) {
            console.log(e.imprimirPersona());
        }
    }
    addOrdenador(o) {
        this._ordenadores.push(o);
    }
    addEmpleado(e) {
        this._empleados.push(e);
    }
    sueldoMedio() {
        let total = 0;
        let empleados = 0;
        for (let e of this._empleados) {
            empleados++;
            total = total + e.sueldo;
        }
        return Math.round(total / empleados);
    }
    imprimirLocal() {
        return `Local con dirección ${this.direccion} y encargado ${this._encargado.nombre} ${this._encargado.apellidos} con DNI ${this._encargado.dni}`;
    }
    edadMedia() {
        let total = 0;
        let empleados = 0;
        for (let e of this._empleados) {
            empleados++;
            total = total + e.edad();
        }
        return Math.round(total / empleados);
    }
    reparar() {
        let os = new Array();
        for (let i of this._ordenadores) {
            if (!i.operativo) {
                os.push(i);
            }
        }
        return os;
    }
    revisar(fecha) {
        let os = new Array();
        for (let i of this._ordenadores) {
            if (i.ultActualizacion < fecha) {
                os.push(i);
            }
        }
        return os;
    }
}
exports.Local = Local;
const localSchema = new mongoose_1.Schema({
    _nombre: { type: String, unique: true },
    _direccion: { type: String, unique: true },
    _encargado: { type: Persona_1.personaSchema, unique: true },
    _ordenadores: { type: [Ordenador_1.ordenadorSchema] },
    _empleados: { type: [Persona_1.personaSchema] }
});
exports.Locales = mongoose_1.model('Locales', localSchema);
