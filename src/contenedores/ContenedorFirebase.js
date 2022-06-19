import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase.serviceAccount)
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async listar(id) {
        try {
            let ID = id
            const doc = this.coleccion.doc(`${ID}`)
            const item = await doc.get()
            const response = item.data()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    async listarAll() {
        try {
            const querySnapshot = await this.coleccion.get()
            let docs = querySnapshot.docs;

            const response = docs.map((doc) => ({
                id: doc.id,
                nombre: doc.data().nombre,
                precio: doc.data().precio,
                foto: doc.data().precio,
            }))
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    async guardar(nuevoElem) {
        try {
            this.coleccion.create(nuevoElem)
            console.log('dato insertado')
        } catch (error) {
            console.log(error)
        }
    }

    async actualizar(nuevoElem) {
       try {
            await this.coleccion.doc().update(nuevoElem)
            console.log("usuario acualizado")
       } catch (error) {
            console.log(error)
       }
    }

    async borrar(id) {
        try {
            let ID = id
            const doc = this.coleccion.doc(`${ID}`)
            const item = await doc.delete()
            console.log("usuario borrado exitosamente", item)
        } catch (error) {
            console.log(error)
        }

    }

    async borrarAll() {
        try {
            const docs = await this.listarAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.borrar(id))
            const resultados = await Promise.allSettled(promesas)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                throw new Error('no se borró todo. volver a intentarlo')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

}

export default ContenedorFirebase