const express = require('express')

const app = express()

app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }))

const productos = []

app.get('/', (req, res) => {
    res.render('formulario', { productos });
});

app.get('/productos', function(req, res) {
    res.render('historial', { productos });
 });

app.post('/productos', (req, res) => {
    productos.push(req.body)
    console.log(productos)
    res.redirect('/')
});

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
