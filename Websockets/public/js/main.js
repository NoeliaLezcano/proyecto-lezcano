const socket = io();

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    
    e.preventDefault()

    const producto = {
        nombre: formAgregarProducto[0].value, 
        precio: formAgregarProducto[1].value, 
        foto: formAgregarProducto[2].value,
    }

    socket.emit('update', producto);

    formAgregarProducto.reset()
})

socket.on('productos', manejarEventoproductos);

async function manejarEventoproductos(productos) {

    const recursoRemoto = await fetch('plantillas/tabla-productos.hbs')

    const textoPlantilla = await recursoRemoto.text()

    const functionTemplate = Handlebars.compile(textoPlantilla)

    const html = functionTemplate({ productos })

    document.getElementById('productos').innerHTML = html
}
