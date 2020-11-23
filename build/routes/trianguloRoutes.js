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
exports.trianguloRoutes = void 0;
const express_1 = require("express");
const triangulo_1 = require("../model/triangulo");
const database_1 = require("../database/database");
class TrianguloRoutes {
    constructor() {
        this.getTriangulos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield triangulo_1.Triangulos.find();
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.nuevoTrianguloPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Parametros: ' + req.body);
            // Observar la diferencia entre req.body (para POST) 
            // y req.params (para GET con los parámetros en la URL
            const { nombre, base, altura, lado1, lado2 } = req.body;
            console.log(nombre);
            const dSchema = {
                _nombre: nombre,
                _base: parseInt(base),
                _lado2: parseInt(lado1),
                _lado3: parseInt(lado2),
                _altura: parseInt(altura)
            };
            console.log(dSchema);
            const oSchema = new triangulo_1.Triangulos(dSchema);
            yield database_1.db.conectarBD();
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        this.nuevoTrianguloGet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre, base, altura, lado1, lado2 } = req.params;
            console.log(req.params);
            yield database_1.db.conectarBD();
            const dSchema = {
                _nombre: nombre,
                _base: parseInt(base),
                _lado2: parseInt(lado1),
                _lado3: parseInt(lado2),
                _altura: parseInt(altura)
            };
            const oSchema = new triangulo_1.Triangulos(dSchema);
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        this.trianguloRandom = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Parametros: ' + req.body);
            // Observar la diferencia entre req.body (para POST) 
            // y req.params (para GET con los parámetros en la URL
            const { nombre } = req.body;
            console.log(nombre);
            const dSchema = {
                _nombre: nombre,
                _base: Math.random() * 10,
                _lado2: Math.random() * 10,
                _lado3: Math.random() * 10,
                _altura: Math.random() * 10
            };
            console.log(dSchema);
            const oSchema = new triangulo_1.Triangulos(dSchema);
            yield database_1.db.conectarBD();
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/', this.getTriangulos);
        this._router.get('/nuevoG/:nombre&:base&:altura&:lado1&:lado2', this.nuevoTrianguloGet);
        this._router.post('/nuevoP', this.nuevoTrianguloPost);
        this._router.post('/nuevoRandom', this.trianguloRandom);
    }
}
const obj = new TrianguloRoutes();
obj.misRutas();
exports.trianguloRoutes = obj.router;
