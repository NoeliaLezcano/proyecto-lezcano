const {ContenedorArchivo} = require('./ContenedorArchivo.js');
const express = require('express')

const grupo = new ContenedorArchivo('./productos.json');

const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

const productsController = {
    async getAll (req, res){
        const allProducts = await grupo.getAll()
        await res.json(allProducts);
    },

    async getRandom (req, res){
        const randomProduct = await grupo.getRandom();
        await res.send(randomProduct);
    }
}

app.get('/productos', productsController.getAll)

app.get('/productoRandom', productsController.getRandom)



