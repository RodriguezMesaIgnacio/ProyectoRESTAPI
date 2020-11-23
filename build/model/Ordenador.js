"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordenadorSchema = exports.Ordenador = void 0;
const mongoose_1 = require("mongoose");
class Ordenador {
    //En el constructor ponemos por defecto la fecha de hoy en el atributo ultActualizacion
    constructor(nombre, precio, marca, fechaCompra, operativo) {
        this._nombre = nombre;
        this._precio = precio;
        this._marca = marca;
        this._fechaCompra = fechaCompra;
        this._ultActualizacion = new Date();
        this._operativo = operativo;
    }
    //Cada vez que hagamos el Set de algún atributo cambiaremos la ultActualizacion al día de hoy
    get nombre() {
        return this._nombre;
    }
    set nombre(nombre) {
        this._nombre = nombre;
        this._ultActualizacion = new Date();
    }
    get precio() {
        return this._precio;
    }
    set precio(precio) {
        this._precio = precio;
        this._ultActualizacion = new Date();
    }
    get marca() {
        return this._marca;
    }
    set marca(marca) {
        this._marca = marca;
        this._ultActualizacion = new Date();
    }
    get fechaCompra() {
        return this._fechaCompra;
    }
    set fechaCompra(fechaCompra) {
        this._fechaCompra = fechaCompra;
        this._ultActualizacion = new Date();
    }
    get ultActualizacion() {
        return this._ultActualizacion;
    }
    set ultActualizacion(ultActualizacion) {
        this._ultActualizacion = ultActualizacion;
    }
    get operativo() {
        return this._operativo;
    }
    set operativo(operativo) {
        this._operativo = operativo;
        this._ultActualizacion = new Date();
    }
    reparar() {
        if (!this._operativo) {
            this._operativo = true;
            return "El PC fue reparado";
        }
        else {
            return "Este PC funciona correctamente";
        }
    }
    imprimirOrdenador() {
        if (this.operativo) {
            return `El ordenador ${this._nombre} vale ${this._precio} es de la marca ${this._marca} y funciona correctamente`;
        }
        else {
            return `El ordenador ${this._nombre} vale ${this._precio} es de la marca ${this._marca} y necesita ser reparado`;
        }
    }
}
exports.Ordenador = Ordenador;
exports.ordenadorSchema = new mongoose_1.Schema({
    _nombre: { type: String },
    _precio: { type: Number },
    _marca: { type: String },
    _fechaCompra: { type: Date },
    _ultActualizacion: { type: Date },
    _operativo: { type: Boolean }
});
