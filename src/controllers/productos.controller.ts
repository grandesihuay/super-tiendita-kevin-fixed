import { Router } from "express";
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../models/productos.model.js";
import { validate } from "../middlewares/validate.js";
import { productoSchema, actualizarProductoSchema } from "../schemas/productos.schema.js";

export const productosRouter = Router();

productosRouter.get("/", async (req, res, next) => {
  try {
    const productos = await obtenerProductos();
    res.json(productos);
  } catch (err) {
    next(err);
  }
});

productosRouter.get("/:id", async (req, res, next) => {
  try {
    // BUG: el id llega por la URL (req.params), no por el body.
    const id = Number((req.body as any).id);
    const producto = await obtenerProductoPorId(id);
    if (!producto) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    res.json(producto);
  } catch (err) {
    next(err);
  }
});

productosRouter.post("/", validate(productoSchema), async (req, res, next) => {
  try {
    const nuevoProducto = await crearProducto(req.body);
    res.status(201).json(nuevoProducto);
  } catch (err) {
    next(err);
  }
});

productosRouter.put("/:id", validate(actualizarProductoSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    // BUG: la funcion importada se llama "actualizarProducto", no "actualizarProducts".
    const producto = await actualizarProducts(id, req.body);
    if (!producto) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    res.json(producto);
  } catch (err) {
    next(err);
  }
});

productosRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const eliminado = await eliminarProducto(id);
    if (!eliminado) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    next(err);
  }
});
