import mongoose, { model } from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async listar(id) {
        try {
            this.coleccion.find({id : id})
        } catch (error) {
            console.log(error)
        }
    }

    async listarAll() {
        try {
            const coleccion = this.coleccion.find()
            console.log(coleccion)
        } catch (error) {
            console.log(error)
        }
    }

    async guardar(nuevoElem) {
        try {
            const objeto = new this.coleccion(nuevoElem)
            const objetoSave = await objeto.save()
            console.log(objetoSave)
        } catch (error) {
            console.log(error)
        }
    }

    async actualizar(nuevoElem) {
        try {
            this.coleccion.UpdateOne(nuevoElem)
        } catch (error) {
            console.log(error)
        }
        
    }

    async borrar(id) {
        try {
            this.coleccion.DeleteOne( {id : id} )
        } catch (error) {
            console.log(error)
        }
    }

    async borrarAll() {
        try {
            this.coleccion.deleteteMany()
        } catch (error) {
            console.log(error)
        }
    }
}

export default ContenedorMongoDb