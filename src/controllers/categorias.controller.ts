import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../models/categorias.model.js";
import { validate } from "../middlewares/validate.js";
import {
  categoriaSchema,
  actualizarCategoriaSchema,
} from "../schemas/categorias.schema.js";

export const categoriasRouter = Router();

categoriasRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categorias = await obtenerCategorias();
      res.json({ totalCategorias: categorias.length, data: categorias });
    } catch (err) {
      next(err);
    }
  },
);

categoriasRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
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
  },
);

categoriasRouter.post(
  "/",
  validate(categoriaSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // BUG: la funcion importada se llama "crearCategoria", no "crearCategoira".
      const nuevaCategoria = await crearCategoria(req.body);
      res.status(201).json(nuevaCategoria);
    } catch (err) {
      next(err);
    }
  },
);

categoriasRouter.put(
  "/:id",
  validate(actualizarCategoriaSchema),
  async (req: Request, res: Response, next: NextFunction) => {
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
  },
);

categoriasRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
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
  },
);
