const { Router } = require('express')
const { apiControllers } = require('../controllers/apiControllers.js')
const {soloParaAdmins} = require ('../main.js')

const express = require('express')

const routerApiProductos = new Router()

routerApiProductos.use(express.json())
routerApiProductos.use(express.urlencoded({ extended: true }))

routerApiProductos.get('/api/productos', apiControllers.getAll)

routerApiProductos.get('/api/productoRandom', apiControllers.getRandom)

routerApiProductos.get('/api/productos/:idProducto', apiControllers.getById)

routerApiProductos.delete('/api/productos/:idProducto', soloParaAdmins, apiControllers.deleteById)

routerApiProductos.post('/api/productos', soloParaAdmins, apiControllers.postProducts)

routerApiProductos.put('/api/productos/:idProducto', soloParaAdmins, apiControllers.putProduct)



module.exports = { routerApiProductos }