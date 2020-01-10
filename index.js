'use strict';

const express 	 =  require('express');
const bodyParser = require('body-parser');
const mongoose 	 = require('mongoose');
const Product 	 = require('./models/product');

const app = express();
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/product', (req,res) =>{
	Product.find({}, (err, products) => {
		if(err) return res.status(500).send({message: `Error al rrealizar la peticion: ${err} `});
		if(!products) return res.status(404).send({message: `No existen productos` });
		res.status(200).send({ products });
	});
});

app.get('/api/product/:productId', (req,res) =>{
	let productId = req.params.productId;
	Product.findById(productId, (err, product) =>{
		if(err) return res.status(500).send({message: `Error al recuperar el dato: ${err} `});
		if(!product) return res.status(404).send({message: `El producto no existe` });
		res.status(200).send({ product: product });
	});

});

app.post('/api/product', (req,res) =>{

	console.log('POST /api/product');
	console.log(req.body);
	let product = new Product();
	product.name = req.body.name;
	product.picture = req.body.picture;
	product.price = req.body.price;
	product.category = req.body.category;
	product.description = req.body.description;

	product.save((err, productStored) =>{
		if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} ` });
		res.status(200).send({product: 'Producto stored'});
	});
	/*console.log(req.body)
	res.status(200).send({message: 'EL PRODUCTO SE HA RECIBIDO'});*/
});

app.put('/api/product/:productId', (req,res) =>{

});

app.delete('/api/product/:productId', (req,res) =>{

});

/*
app.get('/hola/:name', (req, res) => {
	res.send({message : `Hola ${req.params.name}!`});
});*/


mongoose.connect('mongodb://localhost:27017/shop', (err , res) => {
	if(err){
		console.log(`Error al conectar a la base de datos: ${err}`);
	} 
	console.log('conexion a la bd estable');
	
	app.listen(port,() => {
	console.log(`App corriendo en http://localhost:${port}`)
	});

});

