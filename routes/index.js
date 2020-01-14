'use strict';
const express = require('express');
const api	= express.Router();
const productController = require('../controllers/productController');

api.get('/products',productController.getProducts);
api.get('/product/:productId', productController.getProduct);
api.post('/product', productController.saveProduct);
api.put('/product/:productId', productController.updateProduct);
api.delete('/product/:productId', productController.deleteProduct);
// pruebas

api.get('/productsAll',productController.getAllProducts);
module.exports = api;