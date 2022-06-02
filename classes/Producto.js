function generarId() {
    return `${Date.now()}`
}

class Producto {
    constructor(title, price, thumbnail) {

        if (!title) throw new Error('falta el titulo');
        if (!price) throw new Error('falta el precio');
        if (!thumbnail) throw new Error('falta la miniatura');
    
        if (price < 0) throw new Error('El precio debe ser positivo');

        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = generarId();
    }
}

module.exports = Producto;