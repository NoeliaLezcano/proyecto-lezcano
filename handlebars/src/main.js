const express = require('express')
const app = express()
const { engine } = require('express-handlebars')

const productos = []


app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
/*app.set("views", "./views");
  
/*app.engine("hbs", engine({
    defaultLayout: 'main.handlebars'
}))

app.set('view engine', 'handlebars');

/*app.set('views', './views')*/

app.get('/', (req, res) => {
    res.render('formulario', { productos });
});

app.get('/productos', function(req, res) {
    res.render('productosCargados', { productos });
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
