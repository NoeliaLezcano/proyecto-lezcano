import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('carritos', {
            productos: { type: String, required: true },
            id: { type: Number, required: true },
        })
    }
}

export default CarritosDaoMongoDb