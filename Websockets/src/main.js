const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productos = []

const mensajes = []

// configuro el socket

io.on('connection', socket => {
 
    socket.emit('productos', productos);

    socket.on('update', producto => {
        productos.push(producto)
        io.sockets.emit('productos', productos);
    })

    socket.emit('mensajesActualizados', mensajes)

    socket.on('nuevoMensaje', mensaje => {
        mensaje.fecha = new Date().toLocaleString()
        mensajes.push(mensaje)
        io.sockets.emit('mensajesActualizados', mensajes)
    })
});

// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
