import { z } from "zod";

export const pedidoSchema = z.object({
  cliente_id: z.number().int().positive(),
  producto_id: z.number().int().positive(),
  // BUG: la cantidad deberia ser numerica, no un string.
  cantidad: z.string(),
});

export const actualizarPedidoSchema = pedidoSchema.partial();
