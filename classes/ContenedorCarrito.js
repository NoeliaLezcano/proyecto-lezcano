const fs = require('fs');
const Carrito = require('./Carrito.js');

class ContenedorCarrito {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async save(cart) {
        
        const carts = await this.getAll();
        const idCart = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
        const newCart = new Carrito(idCart, cart.products);

        carts.push(newCart);
        await fs.promises.writeFile(this.ruta, JSON.stringify(carts, null, 2));

        return(newCart)
    }

    async deleteById(id) {
        
        const carts = await this.getAll();
        const index = carts.findIndex((cart) => cart.id === id);
        if (index === -1) {
            const error = new Error('Carrito no encontrado');
            error.tipo = 'db not found';
            throw error;
        }
        const cartsFiltered = carts.filter((cart) => cart.id !== id);
        await fs.promises.writeFile(
            this.ruta,
            JSON.stringify(cartsFiltered, null, 2)
        )
    }

    async addProductToCartById(id, product) {
        
        const carts = await this.getAll();
        const cartIndex = carts.findIndex((cart) => cart.id === id);
        if (cartIndex === -1) {
            const error = new Error('Carrito no encontrado');
            error.tipo = 'db not found';
            throw error;
        }
        const cart = carts[cartIndex];
        cart.products = [...cart.products, ...product];
        carts[cartIndex] = cart;
        await fs.promises.writeFile(
            this.ruta,
            JSON.stringify(carts, null, 2)
        );
        
    }

    async deleteProductFromCartById(idCart, idProduct) {
       
        const carts = await this.getAll();
        const cartIndex = carts.findIndex((cart) => cart.id === idCart);
        if (cartIndex === -1) {
            const error = new Error('Carrito no encontrado');
            error.tipo = 'db not found';
            throw error;
        }
        const cart = carts[cartIndex]
        console.log(idCart,idProduct)
        if (!cart.products.find((product) => product.id === idProduct)) {
            const error = new Error('Producto no encontrado');
            error.tipo = 'db not found';
            throw error;
        }
        cart.products = cart.products.filter((p) => p.id !== idProduct);
        carts[cartIndex] = cart;
        await fs.promises.writeFile(
            this.ruta,
            JSON.stringify(carts, null, 2)
        );
    }

    async getById(id) {
       
        const carts = await this.getAll();
        const cart = carts.find((cart) => cart.id === id);
        return cart;
        
    }

    async getAll() {
        const data = await fs.promises.readFile(this.ruta, "utf-8");
        const carts = JSON.parse(data);
        return carts;    
    }
}

module.exports =  {ContenedorCarrito} ;