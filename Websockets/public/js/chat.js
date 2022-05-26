async function mostrarMensajes(mensajes) {
    const mensajesParaMostrar = mensajes.map(({ fecha, autor, texto }) => {
        return `<li><span class="autor">${autor} </span><span class="fecha">[${fecha}]</span>: <span class="texto">${texto}</span></li>`
    })

    const mensajesHtml = `
    <ul>
    ${mensajesParaMostrar.join('\n')}
    </ul>`

    const listaMensajes = document.getElementById('listaMensajes')
    listaMensajes.innerHTML = mensajesHtml

}

socket.on('mensajesActualizados', mensajes => {
    mostrarMensajes(mensajes)
})

const botonEnviar = document.getElementById('botonEnviar')
botonEnviar.addEventListener('click', e => {
    const inputAutor = document.getElementById('inputAutor')
    const inputMensaje = document.getElementById('inputMensaje')
    if (inputAutor.value && inputMensaje.value) {
        const mensaje = {
            autor: inputAutor.value,
            texto: inputMensaje.value
        }
        socket.emit('nuevoMensaje', mensaje)
    } else {
        alert('ingrese algun mensaje')
    }
})