/*const Carrito = require('../Carrito.js');*/
const {ContenedorArchivo} = require('../classes/ContenedorArchivo.js');

const grupo = new ContenedorArchivo('./productos.json');

const apiControllers = {
    async getAll (req, res){
        const allProducts = await grupo.getAll();
        await res.json(allProducts);
    },

    async getRandom (req, res){
        const randomProduct = await grupo.getRandom();
        await res.send(randomProduct);
    },

    async getById (req, res) {
        const id = req.params.idProducto;
        try {
            const objectById = await grupo.getById(id);
            await res.json(objectById);
        } catch (error) {
            if (error.tipo === 'db not found') {
                await res.status(404).json({ error: error.message });
            } else {
                await res.status(500).json({ error: error.message });
            }
        }
    },

    async postProducts (req, res) {
        const productoAgregado = await grupo.save(req.body);
        await res.status(201).json(productoAgregado);
    },

    async deleteById (req, res) {
        const id = req.params.idProducto
        try {
            await grupo.deleteById(id);
            res.sendStatus(204);
        } catch (error) {
            if (error.tipo === 'db not found') {
                await res.status(404).json({ error: error.message });
            } else {
                await res.status(500).json({ error: error.message });
            }
        }
    },

    async putProduct (req, res) {
        const id = req.params.idProducto;
        const datos = req.body;
        try {
            const replacedObject = await grupo.replaceById(id, datos);
            await res.json(replacedObject);
        } catch (error) {
            if (error.tipo === 'db not found') {
                await res.status(404).json({ error: error.message });
            } else {
                await res.status(500).json({ error: error.message });
            }
        }
    },
/*
    async postCart (req, res){
        const cart = new Carrito();
        await res.json(cart);
    },

    async postCartProducts (req, res){
        const idCart = req.params.id_carrito;
        const productoAgregado = await grupo.save(req.body);
        await res.status(201).json(productoAgregado);

    }*/
}

module.exports = { apiControllers }