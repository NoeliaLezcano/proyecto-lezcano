const express = require('express')
const { routerApiCarrito } = require('./routers/routerApiCarrito.js')
const { routerApiProductos } = require('./routers/routerApiProductos.js')

const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

let esAdmin = false

function soloParaAdmins(req, res, next) {
    if (esAdmin) {
        next()
    } else {
        res.sendStatus(403)
    }
}


app.get('/login', (req, res) => {
    esAdmin = true
    res.sendStatus(200)
})

app.get('/logout', (req, res) => {
    esAdmin = false
    res.sendStatus(200)
})


app.use(routerApiProductos);
app.use(routerApiCarrito);


module.exports = { soloParaAdmins }
