'use strict';

// eslint-disable-next-line import/no-unresolved
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

const pelicula = require("./src/pelicula");
const personaje = require("./src/personaje");
const planeta = require("./src/planeta");
const especie = require("./src/especie");
const crucero = require("./src/crucero");
const vehiculo = require("./src/vehiculo");
const puntuacion = require("./src/puntuacion");

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://root:1PxK1vVvU2EGPgtd@cluster0.trhtt.mongodb.net/serverless?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then( db => console.log('DB esta Conectado')).catch(error=>console.log(error));

app.use(express.json());
app.use(cors());

app.use("/api/v1/pelicula", pelicula);
app.use("/api/v1/personaje", personaje);
app.use("/api/v1/planeta", planeta);
app.use("/api/v1/especie", especie);
app.use("/api/v1/crucero", crucero);
app.use("/api/v1/vehiculo", vehiculo);
app.use("/api/v1/puntuacion", puntuacion);

app.get('/*', (req, res) => {
  res.send(`Request received: ${req.method} - ${req.path}`);
});

app.use((err, req, res) => {
  console.error(err);
  res.status(500).send('Internal Serverless Error');
});
//Node js | Heroku
app.listen(port, ()=> {
  console.log("run in port port: " + port );
})
//serveless framework
//module.exports = app;
