# las rutas son de la siguiente manera

```

GET

{uri}/api/v1/pelicula/
{uri}/api/v1/pelicula/:id/
{uri}/api/v1/personaje/
{uri}/api/v1/personaje/:id/
{uri}/api/v1/planeta/
{uri}/api/v1/planeta/:id/
{uri}/api/v1/especie/
{uri}/api/v1/especie/:id/
{uri}/api/v1/crucero/
{uri}/api/v1/crucero/:id/
{uri}/api/v1/vehiculo/
{uri}/api/v1/vehiculo/:id/
{uri}/api/v1/puntuacion/
{uri}/api/v1/puntuacion/:id/

```

# Obtener puntuacion

```
GET

{
    Content-Type: application/json
}

{uri}/api/v1/puntuacion/


```

# Guardar puntuacion

```
POST

{
    Content-Type: application/json
}

{uri}/api/v1/puntuacion/

{
    "nombre":"",
    "puntaje":""
}

```
