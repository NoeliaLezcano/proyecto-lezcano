class Producto {
    constructor(title, price, thumbnail, id) {

        if (!title) throw new Error('falta el titulo');
        if (!price) throw new Error('falta el precio');
        if (!thumbnail) throw new Error('falta la miniatura');
        if (!id) throw new Error('falta el id');
    
        if (price < 0) throw new Error('El precio debe ser positivo');

        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id;
    }
}

module.exports = Producto;