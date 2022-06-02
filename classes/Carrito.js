class Carrito {
    constructor(id, products) {
      this.id = id;
      this.products = products;
    }
  
    getId() {
      return this.id;
    }
  
    getProducts() {
      return this.products;
    }
  
    setProducts(products) {
      this.products = products;
    }
  }

module.exports = Carrito;