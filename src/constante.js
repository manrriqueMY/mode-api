const jsonrespuesta = (data, message = "") => {
    return {
        "status":"ok",
        "message": message,
        "data": data 
    };
}

const jsonerrores = (data, message = "") => {
    return {
        "status":"error",
        "message": message,
        "errors": data 
    };
}

const uris = (data = "", domain, path) => {
    let uri = data.replace(constante.uri, domain);
    switch(path){
        case "pelicula":
            uri = uri.replace("films", path);
            break;
        case "crucero":
            uri = uri.replace("starships", path);
            break; 
        case "personaje":
            uri = uri.replace("people", path);
            break;
        case "planeta":
            uri = uri.replace("planets", path);
            break; 
        case "vehiculo":
            uri = uri.replace("vehicles", path);
            break; 
        case "especie":
            uri = uri.replace("species", path);
            break; 
    }
    return uri
}

const apis = (lista = "", domain, path) => {
    let data;
    if(Array.isArray(lista)){
        data = lista.map(da => uris(da || "", domain, path));
    }else{
        data = uris(lista || "", domain, path);
    }
    return data;
}

const paginacion = (data, domain, path) => {
    return {
        "cantidad": data.count,
        "siguiente": apis(data.next || "", domain, path),
        "anterior": apis(data.previus || "", domain, path),
        "resultado": [...data.results]
    }
}

const constante = {
    "uri": "http://swapi.dev/api",
    "jsonrespuesta": jsonrespuesta,
    "jsonerrores": jsonerrores,
    "respuesta": (respuesta) => {return respuesta;},
    "errores": (errores) => {return errores;},
    "apis": apis,
    "paginacion": paginacion
}
module.exports = constante;