import {query, Request, Response, Router } from 'express'
import { Local, Locales} from '../model/Local'
import { Persona } from '../model/Persona'
import { Ordenador } from '../model/Ordenador'
import { db } from '../database/database'

class LocalRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getLocales = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            const query = await Locales.find()
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        await db.desconectarBD()
    }

    private getLocal = async (req: Request, res: Response) => {
        const { local } = req.params
        await db.conectarBD()
        
        const l1 : any= await Locales.findOne({_nombre:{$eq:local}})
        res.json(l1)
        

        await db.desconectarBD()
    }

    private listarLocales = async (req: Request, res: Response) => {
        type t = {
            nombre: String,
            info: String
        }
        let arrayT: Array<t> = new Array()
        await db.conectarBD()
        let tl: any
        let query : any
        query = await Locales.find({})
        for (tl of query){
            let encargado = new Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, 
                tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo)
            let empleados : Array<Persona> = new Array()
            for (let e of tl._empleados){
                let te = new Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo)
                empleados.push(te)
            }
            let ordenadores : Array<Ordenador> = new Array()
            for (let o of tl._ordenadores){
                let to = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
                to.ultActualizacion=o._ultActualizacion
                ordenadores.push(to)
            }
            let l = new Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados)
            const lt : t ={
                nombre: l.nombre, 
                info: l.imprimirLocal()
            }
            arrayT.push(lt)
        }
        res.json(arrayT)
        await db.desconectarBD()
    }

    private nuevoLocal = async (req: Request, res: Response) => {
        const { nombreLocal, direccion, dni, nombreEncargado, apellidos , telefono, fechaNacimiento, sueldo } = req.body
        const encargado=new Persona(dni, nombreEncargado, apellidos, telefono, new Date(fechaNacimiento), sueldo)
        const ordenadores : Array<Ordenador> = new Array
        const empleados : Array<Persona> = new Array
        const l1=new Local(nombreLocal, direccion, encargado, ordenadores, empleados)
        await db.conectarBD()
        const dSchema={
            _nombre : l1.nombre,
            _direccion : l1.direccion,
            _encargado : l1.encargado,
            _ordenadores : l1.ordenadores,
            _empleados : l1.empleados,
        }
        const oSchema = new Locales(dSchema)
        await oSchema.save()
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }

    private getSueldos = async (req: Request, res: Response) => {
        await db.conectarBD()
        let tl: any
        let query : any
        type t = {
            nombre: String,
            sueldoMedio: Number
        }
        let arrayT: Array<t> = new Array()
        query = await Locales.find({})
        for (tl of query){
            let encargado = new Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, 
                tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo)
            let empleados : Array<Persona> = new Array()
            for (let e of tl._empleados){
                let te = new Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo)
                empleados.push(te)
            }
            let ordenadores : Array<Ordenador> = new Array()
            for (let o of tl._ordenadores){
                let to = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
                to.ultActualizacion=o._ultActualizacion
                ordenadores.push(to)
            }
            let l = new Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados)
            const lt : t ={nombre: l.nombre, sueldoMedio : l.sueldoMedio()}
            arrayT.push(lt)
        }
        res.json(arrayT)
        await db.desconectarBD()
    }

    private getEdades = async (req: Request, res: Response) => {
        await db.conectarBD()
        let tl: any
        let query : any
        type t = {
            nombre: String,
            edadMedia: Number
        }
        let arrayT: Array<t> = new Array()
        query = await Locales.find({})
        for (tl of query){
            let encargado = new Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, 
                tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo)
            let empleados : Array<Persona> = new Array()
            for (let e of tl._empleados){
                let te = new Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo)
                empleados.push(te)
            }
            let ordenadores : Array<Ordenador> = new Array()
            for (let o of tl._ordenadores){
                let to = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
                to.ultActualizacion=o._ultActualizacion
                ordenadores.push(to)
            }
            let l = new Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados)
            const lt : t ={nombre: l.nombre, edadMedia : l.edadMedia()}
            arrayT.push(lt)
        }
        res.json(arrayT)
        await db.desconectarBD()
    }

    private nuevoEmpleado = async (req: Request, res: Response) => {
        const { local } = req.params
        const { dni, nombre, apellidos , telefono, fechaNacimiento, sueldo } = req.body
        const p = new Persona(dni, nombre, apellidos, telefono, new Date(fechaNacimiento), sueldo)
        await db.conectarBD()
        const tl: any = await Locales.findOne({_nombre: {$eq: local}})
        if (tl==null){
            res.send("No existe local con el nombre dado")
        } else {
            let encargado = new Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, 
                tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo)
            let empleados : Array<Persona> = new Array()
            for (let e of tl._empleados){
                let te = new Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo)
                empleados.push(te)
            }
            let ordenadores : Array<Ordenador> = new Array()
            for (let o of tl._ordenadores){
                let to = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
                to.ultActualizacion=o._ultActualizacion
                ordenadores.push(to)
            }
            empleados.push(p)
            let l = new Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados)
            await Locales.findOneAndUpdate(
                {_nombre:l.nombre},
                {
                    _nombre:l.nombre,
                    _direccion:l.direccion,
                    _encargado:l.encargado,
                    _ordenadores:l.ordenadores,
                    _empleados:l.empleados
                },{
                    new:true,
                    runValidators:true  
                }
            )
            .then((doc)=> res.json(doc))
            .catch((error)=> res.send(error))
            await db.desconectarBD()
        }
    }

    private nuevoOrdenador = async (req: Request, res: Response) => {
        const { local } = req.params
        const { nombre, precio, marca, fechaCompra, operativo } = req.body
        const o = new Ordenador(nombre, precio, marca, new Date(fechaCompra), operativo)
        await db.conectarBD()
        const tl: any = await Locales.findOne({_nombre: {$eq: local}})
        if (tl==null){
            res.send("No existe local con el nombre dado")
        } else {
            let encargado = new Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, 
                tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo)
            let empleados : Array<Persona> = new Array()
            for (let e of tl._empleados){
                let te = new Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo)
                empleados.push(te)
            }
            let ordenadores : Array<Ordenador> = new Array()
            for (let o of tl._ordenadores){
                let to = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
                to.ultActualizacion=o._ultActualizacion
                ordenadores.push(to)
            }
            ordenadores.push(o)
            let l = new Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados)
            await Locales.findOneAndUpdate(
                {_nombre:l.nombre},
                {
                    _nombre:l.nombre,
                    _direccion:l.direccion,
                    _encargado:l.encargado,
                    _ordenadores:l.ordenadores,
                    _empleados:l.empleados
                },{
                    new:true,
                    runValidators:true  
                }
            )
            .then((doc)=> res.json(doc))
            .catch((error)=> res.send(error))
            await db.desconectarBD()
        }
    }

    private reparar = async (req: Request, res: Response) => {
        const { local } = req.params
        await db.conectarBD()
        const tl: any = await Locales.findOne({_nombre: {$eq: local}})
        if (tl==null){
            res.send("No existe local con el nombre dado")
        } else {
            let encargado = new Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, 
                tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo)
            let empleados : Array<Persona> = new Array()
            for (let e of tl._empleados){
                let te = new Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo)
                empleados.push(te)
            }
            let ordenadores : Array<Ordenador> = new Array()
            for (let o of tl._ordenadores){
                let to = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
                to.ultActualizacion=o._ultActualizacion
                ordenadores.push(to)
            }
            let l = new Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados)
            res.json(l.reparar())
        }
        await db.desconectarBD()
    }

    private revisar = async (req: Request, res: Response) => {
        const { local, fecha } = req.params
        await db.conectarBD()
        const tl: any = await Locales.findOne({_nombre: {$eq: local}})
        if (tl==null){
            res.send("No existe local con el nombre dado")
        } else {
            let encargado = new Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, 
                tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo)
            let empleados : Array<Persona> = new Array()
            for (let e of tl._empleados){
                let te = new Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo)
                empleados.push(te)
            }
            let ordenadores : Array<Ordenador> = new Array()
            for (let o of tl._ordenadores){
                let to = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
                to.ultActualizacion=o._ultActualizacion
                ordenadores.push(to)
            }
            let l = new Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados)
            res.json(l.revisar(new Date(fecha)))
        }
        await db.desconectarBD()
    }
    
    private reparaPc = async (req: Request, res: Response) => {
        const { local, pc } = req.params
        await db.conectarBD()
        const tl: any = await Locales.findOne({_nombre: {$eq: local}})
        if (tl==null){
            res.send("No existe local con el nombre dado")
        } else {
            let encargado = new Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, 
                tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo)
            let empleados : Array<Persona> = new Array()
            for (let e of tl._empleados){
                let te = new Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo)
                empleados.push(te)
            }
            let ordenadores : Array<Ordenador> = new Array()
            for (let o of tl._ordenadores){
                let to = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
                to.ultActualizacion=o._ultActualizacion
                ordenadores.push(to)
            }
            let l = new Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados)
            for (let o of l.ordenadores){
                if (o.nombre == pc){
                    res.send(o.reparar())
                }
            }
        }
    }

    private editaEncargado = async (req: Request, res: Response) => {
        const { local } = req.params
        const { nombre, apellidos, telefono, fechaNacimiento, sueldo } = req.body
        await db.conectarBD()
        const tl: any = await Locales.findOne({_nombre: {$eq: local}})
        if (tl==null){
            res.send("No existe local con el nombre dado")
        } else {
            let encargado = new Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, 
                tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo)
            encargado.nombre=nombre
            encargado.apellidos=apellidos
            encargado.telefono=parseInt(telefono)
            encargado.fechaNacimiento=new Date(fechaNacimiento)
            encargado.sueldo=parseInt(sueldo)
            let empleados : Array<Persona> = new Array()
            for (let e of tl._empleados){
                let te = new Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo)
                empleados.push(te)
            }
            let ordenadores : Array<Ordenador> = new Array()
            for (let o of tl._ordenadores){
                let to = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
                to.ultActualizacion=o._ultActualizacion
                ordenadores.push(to)
            }
            let l = new Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados)
            await Locales.findOneAndUpdate(
                {_nombre: {$eq:l.nombre}},
                {
                    _nombre:l.nombre,
                    _direccion:l.direccion,
                    _encargado:l.encargado,
                    _ordenadores:l.ordenadores,
                    _empleados:l.empleados
                },
                {
                    new:true,
                    runValidators:true  
                }
            )
            .then((doc)=> res.json(doc))
            .catch((error)=> res.send(error))
        }
        await db.desconectarBD()
    }

    private editaEmpleado = async (req: Request, res: Response) => {
        const { local, empleado } = req.params
        const { nombre, apellidos, telefono, fechaNacimiento, sueldo } = req.body
        await db.conectarBD()
        const tl: any = await Locales.findOne({_nombre: {$eq: local}})
        if (tl==null){
            res.send("No existe local con el nombre dado")
        } else {
            let encargado = new Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, 
                tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo)
            let empleados : Array<Persona> = new Array()
            for (let e of tl._empleados){
                let te = new Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo)
                empleados.push(te)
            }
            let ordenadores : Array<Ordenador> = new Array()
            for (let o of tl._ordenadores){
                let to = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
                to.ultActualizacion=o._ultActualizacion
                ordenadores.push(to)
            }
            for (let e of empleados){
                if (e.dni==empleado){
                    e.nombre=nombre
                    e.apellidos=apellidos
                    e.telefono=parseInt(telefono)
                    e.fechaNacimiento=new Date(fechaNacimiento)
                    e.sueldo=parseInt(telefono)
                }
            }
            let l = new Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados)
            await Locales.findOneAndUpdate(
                {_nombre: {$eq:l.nombre}},
                {
                    _nombre:l.nombre,
                    _direccion:l.direccion,
                    _encargado:l.encargado,
                    _ordenadores:l.ordenadores,
                    _empleados:l.empleados
                },
                {
                    new:true,
                    runValidators:true  
                }
            )
            .then((doc)=> res.json(doc))
            .catch((error)=> res.send(error))
        }
        await db.desconectarBD()
    }

    private editaPc = async (req: Request, res: Response) => {
        const { local, pc } = req.params
        const { precio, marca, fechaCompra, operativo } = req.body
        await db.conectarBD()
        const tl: any = await Locales.findOne({_nombre: {$eq: local}})
        if (tl==null){
            res.send("No existe local con el nombre dado")
        } else {
            let encargado = new Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, 
                tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo)
            let empleados : Array<Persona> = new Array()
            for (let e of tl._empleados){
                let te = new Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo)
                empleados.push(te)
            }
            let ordenadores : Array<Ordenador> = new Array()
            for (let o of tl._ordenadores){
                let to = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
                to.ultActualizacion=o._ultActualizacion
                ordenadores.push(to)
            }
            for (let o of ordenadores){
                if (o.nombre==pc){
                    o.precio=parseInt(precio)
                    o.marca=marca
                    o.fechaCompra=new Date(fechaCompra)
                    o.operativo=operativo
                }
            }
            let l = new Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados)
            await Locales.findOneAndUpdate(
                {_nombre: {$eq:l.nombre}},
                {
                    _nombre:l.nombre,
                    _direccion:l.direccion,
                    _encargado:l.encargado,
                    _ordenadores:l.ordenadores,
                    _empleados:l.empleados
                },
                {
                    new:true,
                    runValidators:true  
                }
            )
            .then((doc)=> res.json(doc))
            .catch((error)=> res.send(error))
        }
        await db.desconectarBD()
    }

    misRutas(){
        this._router.get('/', this.getLocales)
        this._router.get('/verLocal/:local', this.getLocal)
        this._router.get('/lista', this.listarLocales)
        this._router.post('/nuevo', this.nuevoLocal)
        this._router.get('/sueldos', this.getSueldos)
        this._router.get('/edades', this.getEdades)
        this._router.post('/nuevoEmpleado/:local', this.nuevoEmpleado)
        this._router.post('/nuevoOrdenador/:local', this.nuevoOrdenador)
        this.router.get('/reparar/:local', this.reparar)
        this.router.get('/revisar/:local&:fecha', this.revisar)
        this.router.get('/reparaPC/:local&:pc', this.reparaPc)
        this.router.post('/editaEncargado/:local', this.editaEncargado)
        this.router.post('/editaPC/:local&:pc', this.editaPc)
        this.router.post('/editaEmpleado/:local&:empleado', this.editaEmpleado)
        // this.router.get('/')
    }
}

const obj = new LocalRoutes()
obj.misRutas()
export const localRoutes = obj.router
