const { Router } = require('express')
const { ContenedorArchivo } = require('../classes/ContenedorArchivo.js');
const { ContenedorCarrito } = require('../classes/ContenedorCarrito.js');

const express = require('express');

const routerApiCarrito = new Router()

routerApiCarrito.use(express.json())
routerApiCarrito.use(express.urlencoded({ extended: true }))

const cartContainer = new ContenedorCarrito('./carrito.json');
const productContainer = new ContenedorArchivo('./productos.json');

routerApiCarrito.post("/api/carritos/", async (req, res) => {
    const products = req.body.products.map(Number);
    const allProducts = (await productContainer.getAll()).payload;
    const foundProducts = await allProducts.filter((product) =>
      products.includes(product.id)
    );
    const cart = await cartContainer.save({ products: foundProducts });
    res.json(cart);
});
  
routerApiCarrito.delete("/api/carritos/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const cart = await cartContainer.deleteById(id);
    res.json(cart);
});
  
routerApiCarrito.get("/api/carritos/:id/productos", async (req, res) => {
    const id = parseInt(req.params.id);
    const cart = await cartContainer.getById(id);
    res.json(cart);
});
  
routerApiCarrito.post("/api/carritos/:id/productos", async (req, res) => {
    const id = parseInt(req.params.id);
    const products = req.body.products.map(Number);
    const allProducts = (await productContainer.getAll()).payload;
    const foundProducts = await allProducts.filter((product) =>
      products.includes(product.id)
    );
      const result = await cartContainer.addProductToCartById(id, foundProducts);
      res.json(result);
   
});
  
routerApiCarrito.delete("/api/carritos/:id/productos/:productId", async (req, res) => {
    const id = parseInt(req.params.id);
    const productId = parseInt(req.params.productId);
    const cart = await cartContainer.deleteProductFromCartById(id, productId);
    res.json(cart);
});
  

module.exports = { routerApiCarrito }