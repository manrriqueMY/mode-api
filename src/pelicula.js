var express = require('express');
var ruta = express.Router();
const fetch = require('node-fetch');
var {respuesta, uri, apis, paginacion} = require("./constante");

const formato = (pelicula, dominio) => {
    return {
        "titulo":pelicula.title,
        "episodio":pelicula.episode_id,
        "preambulo":pelicula.opening_crawl,
        "director":pelicula.director,
        "productor":pelicula.producer,
        "fecha_publicacion":pelicula.release_date,
        "personajes":apis(pelicula.characters, dominio, "personaje"),
        "planeta":apis(pelicula.homeworld, dominio, "planeta"),
        "cruceros":apis(pelicula.starships, dominio, "crucero"),
        "vehiculos":apis(pelicula.vehicles, dominio, "vehiculo"),
        "especies":apis(pelicula.species, dominio, "especie"),
        "fecha_creado":pelicula.created,
        "fecha_editado":pelicula.edited,
        "uri": apis(pelicula.url, dominio, "pelicula"),
    }
}

ruta.get("/", async(req, res) => {
    let dominio = req.protocol + '://' + req.get('host') + '/api/v1';

    let data = await fetch(`${uri}/films/${isNaN(req.query.page) ? "":"?page=" + req.query.page}`).then(res => res.json()).catch(er => console.log(er));
    let dataf = paginacion(data, dominio, "pelicula");
    dataf.resultado = data.results.map(pelicula => formato(pelicula, dominio));
    res.json(respuesta(dataf));
});

ruta.get("/:id", async(req, res) => {
    let dominio = req.protocol + '://' + req.get('host') + '/api/v1';

    let pelicula = await fetch(`${uri}/films/${req.params.id}`).then(res => res.json()).catch(er => console.log(er));
    let dataf = formato(pelicula, dominio);
    res.json(respuesta(dataf));
});

module.exports = ruta;