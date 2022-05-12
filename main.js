const {ContenedorArchivo} = require('./ContenedorArchivo.js');
const express = require('express')

const grupo = new ContenedorArchivo('./productos.json');

const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiController = {
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
}

app.get('/api/productos', apiController.getAll)

app.get('/api/productoRandom', apiController.getRandom)

app.get('/api/productos/:idProducto', apiController.getById)

app.delete('/api/productos/:idProducto', apiController.deleteById)

app.post('/api/productos', apiController.postProducts)

app.put('/api/productos/:idProducto', apiController.putProduct)

