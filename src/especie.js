var express = require('express');
var ruta = express.Router();
const fetch = require('node-fetch');
var {respuesta, uri, apis, paginacion} = require("./constante");

const formato = (especie, dominio) => {
    return {
        "nombre":especie.name,
        "clasificacion":especie.classification,
        "designacion":especie.designation,
        "estatura_promedio":especie.average_height,
        "color_cabello":especie.hair_color,
        "color_equipamiento":especie.skin_color,
        "color_ojo":especie.eye_color,
        "esperanza_vida":especie.average_lifespan,
        "planeta":apis(especie.homeworld, dominio, "planeta"),
        "lenguaje":especie.language,
        "personajes":apis(especie.people, dominio, "personaje"),
        "peliculas":apis(especie.homeworld, dominio, "pelicula"),
        "fecha_creado":especie.created,
        "fecha_editado":especie.edited,
        "uri": apis(especie.url, dominio, "especie"),
    }
}

ruta.get("/", async(req, res) => {
    let dominio = req.protocol + '://' + req.get('host') + '/api/v1';

    let data = await fetch(`${uri}/species/${isNaN(req.query.page) ? "":"?page=" + req.query.page}`).then(res => res.json()).catch(er => console.log(er));
    let dataf = paginacion(data, dominio, "especie");
    dataf.resultado = data.results.map(especie => formato(especie, dominio));
    res.json(respuesta(dataf));
});

ruta.get("/:id", async(req, res) => {
    let dominio = req.protocol + '://' + req.get('host') + '/api/v1';

    let especie = await fetch(`${uri}/species/${req.params.id}`).then(res => res.json()).catch(er => console.log(er));
    let dataf = formato(especie, dominio);
    res.json(respuesta(dataf));
});

module.exports = ruta;