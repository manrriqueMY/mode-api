var express = require('express');
var ruta = express.Router();
const fetch = require('node-fetch');
var {respuesta, uri, apis, paginacion} = require("./constante");

const formato = (vehiculo, dominio) => {
    return {
        "nombre":vehiculo.name,
        "modelo":vehiculo.model,
        "fabricante":vehiculo.manufacturer,
        "costo":vehiculo.cost_in_credits,
        "longitud":vehiculo.length,
        "velocidad_maxima":vehiculo.max_atmosphering_speed,        
        "tripulación":vehiculo.crew,
        "pasajeros":vehiculo.passengers,
        "capacidad_carga":vehiculo.cargo_capacity,
        "reserva":vehiculo.consumables,
        "clase_vehiculo":vehiculo.vehicle_class,
        "pilotos":apis(vehiculo.pilots, dominio, "personaje"),
        "peliculas":apis(vehiculo.films, dominio, "pelicula"),
        "fecha_creado":vehiculo.created,
        "fecha_editado":vehiculo.edited,
        "uri": apis(vehiculo.url, dominio, "vehiculo"),
    }
}

ruta.get("/", async(req, res) => {
    let dominio = req.protocol + '://' + req.get('host') + '/api/v1';

    let data = await fetch(`${uri}/vehicles/${isNaN(req.query.page) ? "":"?page=" + req.query.page}`).then(res => res.json()).catch(er => console.log(er));
    let dataf = paginacion(data, dominio, "vehiculo");
    dataf.resultado = data.results.map(vehiculo => formato(vehiculo, dominio));
    res.json(respuesta(dataf));
});

ruta.get("/:id", async(req, res) => {
    let dominio = req.protocol + '://' + req.get('host') + '/api/v1';

    let vehiculo = await fetch(`${uri}/vehicles/${req.params.id}`).then(res => res.json()).catch(er => console.log(er));
    let dataf = formato(vehiculo, dominio);
    res.json(respuesta(dataf));
});

module.exports = ruta;