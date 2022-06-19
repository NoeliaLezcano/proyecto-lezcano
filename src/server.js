import express from 'express'
import { carritosRouter } from './routers/carritosRouter.js'
import { productosRouter } from './routers/productosRouter.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

export default app