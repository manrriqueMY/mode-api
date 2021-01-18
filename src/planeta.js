var express = require('express');
var ruta = express.Router();
const fetch = require('node-fetch');
var {respuesta, uri, apis, paginacion} = require("./constante");

const formato = (planeta, dominio) => {
    return {
        "nombre":planeta.name,
        "rotacion":planeta.rotation_period,
        "traslacion":planeta.orbital_period,
        "diametro":planeta.diameter,
        "clima":planeta.climate,
        "gravedad":planeta.gravity,
        "terreno":planeta.terrain,
        "superficie_agua":planeta.surface_water,
        "poblacion":planeta.population,        
        "residentes":apis(planeta.residents, dominio, "personaje"),
        "peliculas":apis(planeta.films, dominio, "pelicula"),
        "fecha_creado":planeta.created,
        "fecha_editado":planeta.edited,
        "uri": apis(planeta.url, dominio, "planeta"),
    }
}

ruta.get("/", async(req, res) => {
    let dominio = req.protocol + '://' + req.get('host') + '/api/v1';

    let data = await fetch(`${uri}/planets/${isNaN(req.query.page) ? "":"?page=" + req.query.page}`).then(res => res.json()).catch(er => console.log(er));
    let dataf = paginacion(data, dominio, "planeta");
    dataf.resultado = data.results.map(planeta => formato(planeta, dominio));
    res.json(respuesta(dataf));
});

ruta.get("/:id", async(req, res) => {
    let dominio = req.protocol + '://' + req.get('host') + '/api/v1';

    let planeta = await fetch(`${uri}/planets/${req.params.id}`).then(res => res.json()).catch(er => console.log(er));
    let dataf = formato(planeta, dominio);
    res.json(respuesta(dataf));
});

module.exports = ruta;