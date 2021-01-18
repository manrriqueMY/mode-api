var express = require('express');
var ruta = express.Router();

const mongo = require('mongoose');
const { jsonrespuesta } = require('./constante');

const Modelo = mongo.model;
var Puntuacion = new Modelo("Puntuacion",{
	nombre:String,
	puntaje:String
});

ruta.get('/',async(req,res)=>{
	const list = await Puntuacion.find({});
	res.json(jsonrespuesta(list));
});

ruta.post('/',async(req,res)=>{
	const {nombre,puntaje}=req.body;
	let punto = new Puntuacion({nombre,puntaje});
	await punto.save();
	res.json(jsonrespuesta(punto, "Guardado Correctamente"));
});

module.exports = ruta;