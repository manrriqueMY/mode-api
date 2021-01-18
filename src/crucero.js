var express = require('express');
var ruta = express.Router();
const fetch = require('node-fetch');
var {respuesta, uri, apis, paginacion} = require("./constante");

const formato = (crucero, dominio) => {
    return {
        "nombre":crucero.name,
        "modelo":crucero.model,
        "fabricante":crucero.manufacturer,
        "costo":crucero.cost_in_credits,
        "longitud":crucero.length,
        "velocidad_maxima":crucero.max_atmosphering_speed,
        "tripulación":crucero.crew,
        "pasajeros":crucero.passengers,
        "capacidad_carga":crucero.cargo_capacity,
        "reserva":crucero.consumables,
        "hiperimpulsor":crucero.hyperdrive_rating,
        "megaluz_hora":crucero.MGLT,
        "clase_crucero":crucero.starship_class,
        "pilotos":apis(crucero.pilots, dominio, "personaje"),
        "peliculas":apis(crucero.films, dominio, "pelicula"),
        "fecha_creado":crucero.created,
        "fecha_editado":crucero.edited,
        "uri": apis(crucero.url, dominio, "crucero"),
    }
}

ruta.get("/", async(req, res) => {
    let dominio = req.protocol + '://' + req.get('host') + '/api/v1';

    let data = await fetch(`${uri}/starships/${isNaN(req.query.page) ? "":"?page=" + req.query.page}`).then(res => res.json()).catch(er => console.log(er));
    let dataf = paginacion(data, dominio, "crucero");
    dataf.resultado = data.results.map(crucero => formato(crucero, dominio));
    res.json(respuesta(dataf));
});

ruta.get("/:id", async(req, res) => {
    let dominio = req.protocol + '://' + req.get('host') + '/api/v1';

    let crucero = await fetch(`${uri}/starships/${req.params.id}`).then(res => res.json()).catch(er => console.log(er));
    let dataf = formato(crucero, dominio);
    res.json(respuesta(dataf));
});

module.exports = ruta;