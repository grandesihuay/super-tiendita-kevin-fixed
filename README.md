# La Super Tiendita de Kevin - API

API REST sencilla hecha con Express + TypeScript + PostgreSQL, con un CRUD
para 4 tablas: categorias, productos, clientes y pedidos.

> Este repositorio se usa como ejercicio de practica: a proposito tiene
> errores regados en el codigo. La API arranca y responde, pero varios
> endpoints se comportan mal. La idea es que los encuentres y los arregles.

## Requisitos

- Node.js 18+
- PostgreSQL corriendo localmente (o accesible por red)

## Como levantar el proyecto

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea la base de datos y las tablas ejecutando el script `sql/schema.sql`
   en tu PostgreSQL (con psql, pgAdmin, DBeaver, lo que uses).

3. Copia `.env.example` a `.env` (o usa el `.env` que ya viene) y ajusta las
   credenciales de tu base de datos.

4. Levanta el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

5. Abre la documentacion interactiva en:

   http://localhost:3000/api-docs

## Estructura del proyecto

```
src/
  config/       conexion a la base de datos y spec de Swagger
  middlewares/  validacion de body con zod y manejo de errores
  controllers/  rutas y handlers de cada recurso (CRUD)
  models/       queries a PostgreSQL con el driver pg
  schemas/      validaciones de zod por recurso
  index.ts      arranque de la app
sql/
  schema.sql    script para crear las tablas (correrlo a mano, no hay migraciones)
```

## Recursos

- `GET/POST /api/categorias`, `GET/PUT/DELETE /api/categorias/:id`
- `GET/POST /api/productos`, `GET/PUT/DELETE /api/productos/:id`
- `GET/POST /api/clientes`, `GET/PUT/DELETE /api/clientes/:id`
- `GET/POST /api/pedidos`, `GET/PUT/DELETE /api/pedidos/:id`, `GET /api/pedidos/cliente/:clienteId`

## Reto

Hay bugs escondidos en distintas capas (schemas, models, controllers,
middlewares, config). Prueba cada endpoint desde `/api-docs` o con
Postman/Insomnia y encuentra por que no se comporta como deberia.

Tips:

- Presta atencion a lo que te marca el editor en rojo, muchas veces ya te
  dice cual es el error e incluso te sugiere el nombre correcto.
- No todos los errores se ven en el editor. Corre `npm run dev` y lee con
  calma lo que aparece en la terminal, ahi tambien hay pistas.
- Si algo no arranca, revisa la terminal antes que nada: el mensaje casi
  siempre te dice el archivo y la linea exacta.
