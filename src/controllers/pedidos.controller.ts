import { Request, Response, Router, NextFunction } from "express";
import { PedidosModel } from "../models/pedidos.model.js";
import {
CreatePedidoInput,
UpdatePedidoInput
} from "../models/pedidos.model.js";
import { validate } from "../middlewares/validate.js";
import { pedidoSchema, UpdatePedidosSchema } from "../schemas/pedidos.schema.js";

export const pedidosRouter = Router();

export async function getPedidos(req: Request, res: Response) {
  try {
    const pedidos = await PedidosModel.findAll();
    res.json({ totalPedidos: pedidos.length, data: pedidos});
  } catch (err) {
   console.error("error al consultar PostgreSQL:", err);
  res.status(500).json({ message: "error al intentar conectar a la base de datos :c" });
  };
}
// BUG: esta ruta esta antes que "/cliente/:clienteId", asi que Express
// hace match aqui primero y "cliente" termina tratado como si fuera un :id.
export async function pedidosRouterById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
     if (isNaN(id)) {
      res.status(400).json({ error: "el id debe ser numerico" });
      return;
    }
    const product = await PedidosModel.findById(id);
    if (!product) {
      res.status(404).json({ error: "Pedido no encotnrado" });
      return;
    }
    res.json({ data: product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export async function getPedidosPorCliente(req: Request, res: Response, next: NextFunction) {
  try {
    const clienteId = Number(req.params.clienteId);
    if (!Number.isInteger(clienteId) || clienteId <= 0) {
      return res.status(400).json({ mensaje: "clienteId inválido" });
    }
    const pedidos = await PedidosModel.findByClienteId(clienteId);
    res.json(pedidos);
  } catch (err) {
    next(err);
  }
}

export async function postPedidos(req: Request, res: Response) {
  try {
    const result = pedidoSchema.safeParse(req.body);
    console.log(result);

    if (!result.success) {
      return res.status(400).json({ error: result.error.issues });
    }
    const newProduct = await PedidosModel.create(result.data);
    res.status(201).json({ data: newProduct });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function putPedidos(req: Request, res: Response) {
try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "EL ID DEBE SER UN VALOR NUMERICO" });
      return;
    }

    const result = UpdatePedidosSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.issues });
      return;
    }

    const productoUpdate = await PedidosModel.update(id, result.data);
    if (!productoUpdate) {
      res.status(404).json({ error: "producto no encontrado" });
      return;
    }
    res.json({ data: productoUpdate });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export async function deletePedidos(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "EL ID DEBE SER UN VALOR NUMERICO" });
    }
    const productEliminado = await PedidosModel.delete(id);
    if (productEliminado) {
      res.status(200).json({ message: "producto eliminado exitosamente" });
    } else {
      res.status(404).json({ message: "producto no encontrado" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

pedidosRouter.get("/", getPedidos);
pedidosRouter.get("/cliente/:clienteId", getPedidosPorCliente);
pedidosRouter.get("/:id", pedidosRouterById);
pedidosRouter.post("/", validate(pedidoSchema), postPedidos);
pedidosRouter.put("/:id", putPedidos);
pedidosRouter.delete("/:id", deletePedidos);