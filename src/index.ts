import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./config/swagger.js";
import { categoriasRouter } from "./controllers/categorias.controller.js";
import { productosRouter } from "./controllers/productos.controller.js";
import { clientesRouter } from "./controllers/clientes.controller.js";
import { pedidosRouter } from "./controllers/pedidos.controller.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
// BUG: "jsonn" no existe en express, esto tumba el servidor al arrancar.
app.use(express.jsonn());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/categorias", categoriasRouter);
app.use("/api/productos", productosRouter);
app.use("/api/clientes", clientesRouter);
app.use("/api/pedidos", pedidosRouter);

app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenido a la API de La Super Tiendita de Kevin. Ve a /api-docs" });
});

app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentacion en http://localhost:${PORT}/api-docs`);
});
