'use strict';
const express = require('express');
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const api	= express.Router();

api.get('/product', auth, productController.getProducts);
api.get('/product/:productId', productController.getProduct);
api.post('/product', auth, productController.saveProduct);
api.put('/product/:productId', auth, productController.updateProduct);
api.delete('/product/:productId', auth, productController.deleteProduct);
api.post('/signup', userController.signUp);
api.post('/signin', userController.signIn);
api.get('/private', auth, function (req, res ){
	res.status(200).send({ message : 'Tienes acceso'});
})
// pruebas

api.get('/productsAll', auth, productController.getAllProducts);
module.exports = api;

/*

SELECT nspname || '.' || relname AS "tabla",
      pg_size_pretty(pg_total_relation_size(c.oid)) AS "tamanio"
FROM  pg_class c
LEFT JOIN pg_namespace n ON (n.oid = c.relnamespace)
WHERE  n.nspname NOT IN ('pg_catalog', 'information_schema') AND
      c.relkind <> 'i' AND
      n.nspname !~ '^pg_toast'
ORDER BY  pg_total_relation_size(c.oid) DESC
LIMIT 20;

*/