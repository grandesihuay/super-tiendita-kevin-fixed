import { Router } from "express";
import {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../models/categorias.model.js";
import { validate } from "../middlewares/validate.js";
import { categoriaSchema, actualizarCategoriaSchema } from "../schemas/categorias.schema.js";

export const categoriasRouter = Router();

categoriasRouter.get("/", async (req, res, next) => {
  try {
    const categorias = await obtenerCategorias();
    res.json(categorias);
  } catch (err) {
    next(err);
  }
});

categoriasRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const categoria = await obtenerCategoriaPorId(id);
    if (!categoria) {
      res.status(404).json({ error: "Categoria no encontrada" });
      return;
    }
    res.json(categoria);
  } catch (err) {
    next(err);
  }
});

categoriasRouter.post("/", validate(categoriaSchema), async (req, res, next) => {
  try {
    // BUG: la funcion importada se llama "crearCategoria", no "crearCategoira".
    const nuevaCategoria = await crearCategoira(req.body);
    res.status(201).json(nuevaCategoria);
  } catch (err) {
    next(err);
  }
});

categoriasRouter.put("/:id", validate(actualizarCategoriaSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const categoria = await actualizarCategoria(id, req.body);
    if (!categoria) {
      res.status(404).json({ error: "Categoria no encontrada" });
      return;
    }
    res.json(categoria);
  } catch (err) {
    next(err);
  }
});

categoriasRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const eliminada = await eliminarCategoria(id);
    if (!eliminada) {
      res.status(404).json({ error: "Categoria no encontrada" });
      return;
    }
    res.json({ message: "Categoria eliminada" });
  } catch (err) {
    next(err);
  }
});
