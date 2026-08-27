import { Router } from "express";
import {
  obtenerPedidos,
  obtenerPedidoPorId,
  obtenerPedidosPorCliente,
  crearPedido,
  actualizarPedido,
  eliminarPedido,
} from "../models/pedidos.model.js";
import { validate } from "../middlewares/validate.js";
import { pedidoSchema, actualizarPedidoSchema } from "../schemas/pedidos.schema.js";

export const pedidosRouter = Router();

pedidosRouter.get("/", async (req, res, next) => {
  try {
    const pedidos = await obtenerPedidos();
    res.json(pedidos);
  } catch (err) {
    next(err);
  }
});

// BUG: esta ruta esta antes que "/cliente/:clienteId", asi que Express
// hace match aqui primero y "cliente" termina tratado como si fuera un :id.
pedidosRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const pedido = await obtenerPedidoPorId(id);
    if (!pedido) {
      res.status(404).json({ error: "Pedido no encontrado" });
      return;
    }
    res.json(pedido);
  } catch (err) {
    next(err);
  }
});

pedidosRouter.get("/cliente/:clienteId", async (req, res, next) => {
  try {
    const clienteId = Number(req.params.clienteId);
    const pedidos = await obtenerPedidosPorCliente(clienteId);
    res.json(pedidos);
  } catch (err) {
    next(err);
  }
});

pedidosRouter.post("/", validate(pedidoSchema), async (req, res, next) => {
  try {
    const nuevoPedido = await crearPedido(req.body);
    res.status(201).json(nuevoPedido);
  } catch (err) {
    next(err);
  }
});

pedidosRouter.put("/:id", validate(actualizarPedidoSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    // BUG: la funcion importada se llama "actualizarPedido", no "actualizarPedidos".
    const pedido = await actualizarPedidos(id, req.body);
    if (!pedido) {
      res.status(404).json({ error: "Pedido no encontrado" });
      return;
    }
    res.json(pedido);
  } catch (err) {
    next(err);
  }
});

pedidosRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const eliminado = await eliminarPedido(id);
    if (!eliminado) {
      res.status(404).json({ error: "Pedido no encontrado" });
      return;
    }
    res.json({ message: "Pedido eliminado" });
  } catch (err) {
    next(err);
  }
});
