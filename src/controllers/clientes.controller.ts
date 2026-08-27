import { Router } from "express";
import {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from "../models/clientes.model.js";
import { validate } from "../middlewares/validate.js";
import { clienteSchema, actualizarClienteSchema } from "../schemas/clientes.schema.js";

export const clientesRouter = Router();

clientesRouter.get("/", async (req, res, next) => {
  try {
    // BUG: la funcion importada se llama "obtenerClientes", no "obtenerCliente".
    const clientes = await obtenerCliente();
    res.json(clientes);
  } catch (err) {
    next(err);
  }
});

clientesRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const cliente = await obtenerClientePorId(id);
    if (!cliente) {
      res.status(404).json({ error: "Cliente no encontrado" });
      return;
    }
    res.json(cliente);
  } catch (err) {
    next(err);
  }
});

clientesRouter.post("/", validate(clienteSchema), async (req, res, next) => {
  try {
    const nuevoCliente = await crearCliente(req.body);
    res.status(201).json(nuevoCliente);
  } catch (err) {
    next(err);
  }
});

clientesRouter.put("/:id", validate(actualizarClienteSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const cliente = await actualizarCliente(id, req.body);
    if (!cliente) {
      res.status(404).json({ error: "Cliente no encontrado" });
      return;
    }
    res.json(cliente);
  } catch (err) {
    next(err);
  }
});

clientesRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    // BUG: no se revisa si realmente se elimino algo, siempre responde OK.
    await eliminarCliente(id);
    res.status(200).json({ message: "Cliente eliminado" });
  } catch (err) {
    next(err);
  }
});
