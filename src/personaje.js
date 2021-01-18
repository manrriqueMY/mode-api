var express = require('express');
var ruta = express.Router();
const fetch = require('node-fetch');
var {respuesta, uri, apis, paginacion} = require("./constante");

const formato = (personaje, dominio) => {
    return {
        "nombre":personaje.name,
        "altura":personaje.height,
        "peso":personaje.mass,
        "color_cabello":personaje.hair_color,
        "color_equipamiento":personaje.skin_color,
        "color_ojo":personaje.eye_color,
        "cumpleanio":personaje.birth_year,
        "genero":personaje.gender,
        "planeta":apis(personaje.homeworld, dominio, "planeta"),
        "peliculas":apis(personaje.films, dominio, "pelicula"),
        "especies":apis(personaje.species, dominio, "especie"),
        "vehiculos":apis(personaje.vehicles, dominio, "vehiculo"),
        "cruceros":apis(personaje.starships, dominio, "crucero"),
        "fecha_creado":personaje.created,
        "fecha_editado":personaje.edited,
        "uri": apis(personaje.url, dominio, "personaje"),
    }
}

ruta.get("/", async(req, res) => {
    let dominio = req.protocol + '://' + req.get('host') + '/api/v1';

    let data = await fetch(`${uri}/people/${isNaN(req.query.page) ? "":"?page=" + req.query.page}`).then(res => res.json()).catch(er => console.log(er));
    let dataf = paginacion(data, dominio, "personaje");
    dataf.resultado = data.results.map(personaje => formato(personaje, dominio));
    res.json(respuesta(dataf));
});

ruta.get("/:id", async(req, res) => {
    let dominio = req.protocol + '://' + req.get('host') + '/api/v1';

    let personaje = await fetch(`${uri}/people/${req.params.id}`).then(res => res.json()).catch(er => console.log(er));
    let dataf = formato(personaje, dominio);
    res.json(respuesta(dataf));
});

module.exports = ruta;