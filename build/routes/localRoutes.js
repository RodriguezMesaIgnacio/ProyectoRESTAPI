"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localRoutes = void 0;
const express_1 = require("express");
const Local_1 = require("../model/Local");
const Persona_1 = require("../model/Persona");
const Ordenador_1 = require("../model/Ordenador");
const database_1 = require("../database/database");
class LocalRoutes {
    constructor() {
        this.getLocales = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                const query = yield Local_1.Locales.find();
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getLocal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { local } = req.params;
            yield database_1.db.conectarBD();
            const l1 = yield Local_1.Locales.findOne({ _nombre: { $eq: local } });
            res.json(l1);
            yield database_1.db.desconectarBD();
        });
        this.listarLocales = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let arrayT = new Array();
            yield database_1.db.conectarBD();
            let tl;
            let query;
            query = yield Local_1.Locales.find({});
            for (tl of query) {
                let encargado = new Persona_1.Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo);
                let empleados = new Array();
                for (let e of tl._empleados) {
                    let te = new Persona_1.Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo);
                    empleados.push(te);
                }
                let ordenadores = new Array();
                for (let o of tl._ordenadores) {
                    let to = new Ordenador_1.Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo);
                    to.ultActualizacion = o._ultActualizacion;
                    ordenadores.push(to);
                }
                let l = new Local_1.Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados);
                const lt = {
                    nombre: l.nombre,
                    info: l.imprimirLocal()
                };
                arrayT.push(lt);
            }
            res.json(arrayT);
            yield database_1.db.desconectarBD();
        });
        this.nuevoLocal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombreLocal, direccion, dni, nombreEncargado, apellidos, telefono, fechaNacimiento, sueldo } = req.body;
            const encargado = new Persona_1.Persona(dni, nombreEncargado, apellidos, telefono, new Date(fechaNacimiento), sueldo);
            const ordenadores = new Array;
            const empleados = new Array;
            const l1 = new Local_1.Local(nombreLocal, direccion, encargado, ordenadores, empleados);
            yield database_1.db.conectarBD();
            const dSchema = {
                _nombre: l1.nombre,
                _direccion: l1.direccion,
                _encargado: l1.encargado,
                _ordenadores: l1.ordenadores,
                _empleados: l1.empleados,
            };
            const oSchema = new Local_1.Locales(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.getSueldos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD();
            let tl;
            let query;
            let arrayT = new Array();
            query = yield Local_1.Locales.find({});
            for (tl of query) {
                let encargado = new Persona_1.Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo);
                let empleados = new Array();
                for (let e of tl._empleados) {
                    let te = new Persona_1.Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo);
                    empleados.push(te);
                }
                let ordenadores = new Array();
                for (let o of tl._ordenadores) {
                    let to = new Ordenador_1.Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo);
                    to.ultActualizacion = o._ultActualizacion;
                    ordenadores.push(to);
                }
                let l = new Local_1.Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados);
                const lt = { nombre: l.nombre, sueldoMedio: l.sueldoMedio() };
                arrayT.push(lt);
            }
            res.json(arrayT);
            yield database_1.db.desconectarBD();
        });
        this.getEdades = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD();
            let tl;
            let query;
            let arrayT = new Array();
            query = yield Local_1.Locales.find({});
            for (tl of query) {
                let encargado = new Persona_1.Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo);
                let empleados = new Array();
                for (let e of tl._empleados) {
                    let te = new Persona_1.Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo);
                    empleados.push(te);
                }
                let ordenadores = new Array();
                for (let o of tl._ordenadores) {
                    let to = new Ordenador_1.Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo);
                    to.ultActualizacion = o._ultActualizacion;
                    ordenadores.push(to);
                }
                let l = new Local_1.Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados);
                const lt = { nombre: l.nombre, edadMedia: l.edadMedia() };
                arrayT.push(lt);
            }
            res.json(arrayT);
            yield database_1.db.desconectarBD();
        });
        this.nuevoEmpleado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { local } = req.params;
            const { dni, nombre, apellidos, telefono, fechaNacimiento, sueldo } = req.body;
            const p = new Persona_1.Persona(dni, nombre, apellidos, telefono, new Date(fechaNacimiento), sueldo);
            yield database_1.db.conectarBD();
            const tl = yield Local_1.Locales.findOne({ _nombre: { $eq: local } });
            if (tl == null) {
                res.send("No existe local con el nombre dado");
            }
            else {
                let encargado = new Persona_1.Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo);
                let empleados = new Array();
                for (let e of tl._empleados) {
                    let te = new Persona_1.Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo);
                    empleados.push(te);
                }
                let ordenadores = new Array();
                for (let o of tl._ordenadores) {
                    let to = new Ordenador_1.Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo);
                    to.ultActualizacion = o._ultActualizacion;
                    ordenadores.push(to);
                }
                empleados.push(p);
                let l = new Local_1.Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados);
                yield Local_1.Locales.findOneAndUpdate({ _nombre: l.nombre }, {
                    _nombre: l.nombre,
                    _direccion: l.direccion,
                    _encargado: l.encargado,
                    _ordenadores: l.ordenadores,
                    _empleados: l.empleados
                }, {
                    new: true,
                    runValidators: true
                })
                    .then((doc) => res.json(doc))
                    .catch((error) => res.send(error));
                yield database_1.db.desconectarBD();
            }
        });
        this.nuevoOrdenador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { local } = req.params;
            const { nombre, precio, marca, fechaCompra, operativo } = req.body;
            const o = new Ordenador_1.Ordenador(nombre, precio, marca, new Date(fechaCompra), operativo);
            yield database_1.db.conectarBD();
            const tl = yield Local_1.Locales.findOne({ _nombre: { $eq: local } });
            if (tl == null) {
                res.send("No existe local con el nombre dado");
            }
            else {
                let encargado = new Persona_1.Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo);
                let empleados = new Array();
                for (let e of tl._empleados) {
                    let te = new Persona_1.Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo);
                    empleados.push(te);
                }
                let ordenadores = new Array();
                for (let o of tl._ordenadores) {
                    let to = new Ordenador_1.Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo);
                    to.ultActualizacion = o._ultActualizacion;
                    ordenadores.push(to);
                }
                ordenadores.push(o);
                let l = new Local_1.Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados);
                yield Local_1.Locales.findOneAndUpdate({ _nombre: l.nombre }, {
                    _nombre: l.nombre,
                    _direccion: l.direccion,
                    _encargado: l.encargado,
                    _ordenadores: l.ordenadores,
                    _empleados: l.empleados
                }, {
                    new: true,
                    runValidators: true
                })
                    .then((doc) => res.json(doc))
                    .catch((error) => res.send(error));
                yield database_1.db.desconectarBD();
            }
        });
        this.reparar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { local } = req.params;
            yield database_1.db.conectarBD();
            const tl = yield Local_1.Locales.findOne({ _nombre: { $eq: local } });
            if (tl == null) {
                res.send("No existe local con el nombre dado");
            }
            else {
                let encargado = new Persona_1.Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo);
                let empleados = new Array();
                for (let e of tl._empleados) {
                    let te = new Persona_1.Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo);
                    empleados.push(te);
                }
                let ordenadores = new Array();
                for (let o of tl._ordenadores) {
                    let to = new Ordenador_1.Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo);
                    to.ultActualizacion = o._ultActualizacion;
                    ordenadores.push(to);
                }
                let l = new Local_1.Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados);
                res.json(l.reparar());
            }
            yield database_1.db.desconectarBD();
        });
        this.revisar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { local, fecha } = req.params;
            yield database_1.db.conectarBD();
            const tl = yield Local_1.Locales.findOne({ _nombre: { $eq: local } });
            if (tl == null) {
                res.send("No existe local con el nombre dado");
            }
            else {
                let encargado = new Persona_1.Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo);
                let empleados = new Array();
                for (let e of tl._empleados) {
                    let te = new Persona_1.Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo);
                    empleados.push(te);
                }
                let ordenadores = new Array();
                for (let o of tl._ordenadores) {
                    let to = new Ordenador_1.Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo);
                    to.ultActualizacion = o._ultActualizacion;
                    ordenadores.push(to);
                }
                let l = new Local_1.Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados);
                res.json(l.revisar(new Date(fecha)));
            }
            yield database_1.db.desconectarBD();
        });
        this.reparaPc = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { local, pc } = req.params;
            yield database_1.db.conectarBD();
            const tl = yield Local_1.Locales.findOne({ _nombre: { $eq: local } });
            if (tl == null) {
                res.send("No existe local con el nombre dado");
            }
            else {
                let encargado = new Persona_1.Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo);
                let empleados = new Array();
                for (let e of tl._empleados) {
                    let te = new Persona_1.Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo);
                    empleados.push(te);
                }
                let ordenadores = new Array();
                for (let o of tl._ordenadores) {
                    let to = new Ordenador_1.Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo);
                    to.ultActualizacion = o._ultActualizacion;
                    ordenadores.push(to);
                }
                let l = new Local_1.Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados);
                for (let o of l.ordenadores) {
                    if (o.nombre == pc) {
                        res.send(o.reparar());
                    }
                }
            }
        });
        this.editaEncargado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { local } = req.params;
            const { nombre, apellidos, telefono, fechaNacimiento, sueldo } = req.body;
            yield database_1.db.conectarBD();
            const tl = yield Local_1.Locales.findOne({ _nombre: { $eq: local } });
            if (tl == null) {
                res.send("No existe local con el nombre dado");
            }
            else {
                let encargado = new Persona_1.Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo);
                encargado.nombre = nombre;
                encargado.apellidos = apellidos;
                encargado.telefono = parseInt(telefono);
                encargado.fechaNacimiento = new Date(fechaNacimiento);
                encargado.sueldo = parseInt(sueldo);
                let empleados = new Array();
                for (let e of tl._empleados) {
                    let te = new Persona_1.Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo);
                    empleados.push(te);
                }
                let ordenadores = new Array();
                for (let o of tl._ordenadores) {
                    let to = new Ordenador_1.Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo);
                    to.ultActualizacion = o._ultActualizacion;
                    ordenadores.push(to);
                }
                let l = new Local_1.Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados);
                yield Local_1.Locales.findOneAndUpdate({ _nombre: { $eq: l.nombre } }, {
                    _nombre: l.nombre,
                    _direccion: l.direccion,
                    _encargado: l.encargado,
                    _ordenadores: l.ordenadores,
                    _empleados: l.empleados
                }, {
                    new: true,
                    runValidators: true
                })
                    .then((doc) => res.json(doc))
                    .catch((error) => res.send(error));
            }
            yield database_1.db.desconectarBD();
        });
        this.editaEmpleado = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { local, empleado } = req.params;
            const { nombre, apellidos, telefono, fechaNacimiento, sueldo } = req.body;
            yield database_1.db.conectarBD();
            const tl = yield Local_1.Locales.findOne({ _nombre: { $eq: local } });
            if (tl == null) {
                res.send("No existe local con el nombre dado");
            }
            else {
                let encargado = new Persona_1.Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo);
                let empleados = new Array();
                for (let e of tl._empleados) {
                    let te = new Persona_1.Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo);
                    empleados.push(te);
                }
                let ordenadores = new Array();
                for (let o of tl._ordenadores) {
                    let to = new Ordenador_1.Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo);
                    to.ultActualizacion = o._ultActualizacion;
                    ordenadores.push(to);
                }
                for (let e of empleados) {
                    if (e.dni == empleado) {
                        e.nombre = nombre;
                        e.apellidos = apellidos;
                        e.telefono = parseInt(telefono);
                        e.fechaNacimiento = new Date(fechaNacimiento);
                        e.sueldo = parseInt(telefono);
                    }
                }
                let l = new Local_1.Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados);
                yield Local_1.Locales.findOneAndUpdate({ _nombre: { $eq: l.nombre } }, {
                    _nombre: l.nombre,
                    _direccion: l.direccion,
                    _encargado: l.encargado,
                    _ordenadores: l.ordenadores,
                    _empleados: l.empleados
                }, {
                    new: true,
                    runValidators: true
                })
                    .then((doc) => res.json(doc))
                    .catch((error) => res.send(error));
            }
            yield database_1.db.desconectarBD();
        });
        this.editaPc = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { local, pc } = req.params;
            const { precio, marca, fechaCompra, operativo } = req.body;
            yield database_1.db.conectarBD();
            const tl = yield Local_1.Locales.findOne({ _nombre: { $eq: local } });
            if (tl == null) {
                res.send("No existe local con el nombre dado");
            }
            else {
                let encargado = new Persona_1.Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo);
                let empleados = new Array();
                for (let e of tl._empleados) {
                    let te = new Persona_1.Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo);
                    empleados.push(te);
                }
                let ordenadores = new Array();
                for (let o of tl._ordenadores) {
                    let to = new Ordenador_1.Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo);
                    to.ultActualizacion = o._ultActualizacion;
                    ordenadores.push(to);
                }
                for (let o of ordenadores) {
                    if (o.nombre == pc) {
                        o.precio = parseInt(precio);
                        o.marca = marca;
                        o.fechaCompra = new Date(fechaCompra);
                        o.operativo = operativo;
                    }
                }
                let l = new Local_1.Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados);
                yield Local_1.Locales.findOneAndUpdate({ _nombre: { $eq: l.nombre } }, {
                    _nombre: l.nombre,
                    _direccion: l.direccion,
                    _encargado: l.encargado,
                    _ordenadores: l.ordenadores,
                    _empleados: l.empleados
                }, {
                    new: true,
                    runValidators: true
                })
                    .then((doc) => res.json(doc))
                    .catch((error) => res.send(error));
            }
            yield database_1.db.desconectarBD();
        });
        this.borrar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { local } = req.params;
            yield database_1.db.conectarBD();
            yield Local_1.Locales.findOneAndDelete({ _nombre: local }, (err, doc) => {
                if (err)
                    console.log(err);
                else {
                    if (doc == null) {
                        res.send(`No encontrado`);
                    }
                    else {
                        res.send('Borrado correcto: ' + doc);
                    }
                }
            });
            database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/', this.getLocales);
        this._router.get('/verLocal/:local', this.getLocal);
        this._router.get('/lista', this.listarLocales);
        this._router.post('/nuevo', this.nuevoLocal);
        this._router.get('/sueldos', this.getSueldos);
        this._router.get('/edades', this.getEdades);
        this._router.post('/nuevoEmpleado/:local', this.nuevoEmpleado);
        this._router.post('/nuevoOrdenador/:local', this.nuevoOrdenador);
        this.router.get('/reparar/:local', this.reparar);
        this.router.get('/revisar/:local&:fecha', this.revisar);
        this.router.get('/reparaPC/:local&:pc', this.reparaPc);
        this.router.post('/editaEncargado/:local', this.editaEncargado);
        this.router.post('/editaPC/:local&:pc', this.editaPc);
        this.router.post('/editaEmpleado/:local&:empleado', this.editaEmpleado);
        this.router.get('/borrar/:local', this.borrar);
    }
}
const obj = new LocalRoutes();
obj.misRutas();
exports.localRoutes = obj.router;
