const fs = require('fs');
const Producto = require('./Producto.js');

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = ruta
        this.productos = []
    }

    _write() {
        const productosComoJson = JSON.stringify(this.productos, null, 3);
        return fs.promises.writeFile(this.ruta, productosComoJson);
    }

    _read() {
        return fs.promises.readFile(this.ruta, 'utf-8')
            .then(texto => {
                const productosComoArray = JSON.parse(texto);
                this.productos = productosComoArray;
            })
    }

    async save(datos) {
        const producto = new Producto(datos.title, datos.price, datos.thumbnail, datos.id);
        await this._read();
        this.productos.push(producto);
        await this._write();
        return producto;

    }

    async getAll() {
        await this._read();
        return [...this.productos];
    }

    async getById(id) {
        await this._read();
        const objectById = this.productos.find(producto => producto.id === id);
        if (!objectById) {
            const error = new Error('Producto no encontrado')
            error.tipo = 'db not found'
            throw error
        }
        return objectById;
    }

    async deleteById(id) {
        await this._read();
        const indice = this.productos.findIndex(producto => producto.id === id);
        if (indice === -1) {
            const error = new Error('Producto no encontrado');
            error.tipo = 'db not found';
            throw error;
        }
        this.productos.splice(indice, 1);
        await this._write();
    }

    async deleteAll() {
        this.productos.splice(0, this.productos.length);
        await this._write();
    }

    async getRandom() {
        await this._read();
        const random = this.productos[Math.floor(Math.random() * this.productos.length)];
        return random;
    }

    async replaceById (id, datos) {
        await this._read();
        const indice = this.productos.findIndex(producto => producto.id === id);
        if (indice === -1) {
            const error = new Error('Producto no encontrado')
            error.tipo = 'db not found'
            throw error
        }
        const producto = new Producto(datos.title, datos.price, datos.thumbnail, datos.id);
        producto.id = id;
        this.productos[indice] = producto;
        await this._write();
        return producto;
    }
}

module.exports =  {ContenedorArchivo} ;