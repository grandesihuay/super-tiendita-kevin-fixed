import { z } from "zod";

export const pedidoSchema = z.object({
  cliente_id: z.number().int().positive(),
  producto_id: z.number().int().positive(),
  // BUG: la cantidad deberia ser numerica, no un string.
  cantidad: z.number().int().positive()
});

export const UpdatePedidosSchema = pedidoSchema
  .pick({ cantidad: true })
  .extend({ fecha: z.string() })
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "Debe enviar al menos un campo para actualizar",
  });
