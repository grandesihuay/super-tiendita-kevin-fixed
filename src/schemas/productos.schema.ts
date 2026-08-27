import { z } from "zod";

export const productoSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  precio: z.number().positive("El precio debe ser mayor a 0"),
  // BUG: falta impedir stock negativo (deberia tener .nonnegative()).
  stock: z.number().int().default(0),
  categoria_id: z.number().int().positive("categoria_id es requerido"),
});

export const actualizarProductoSchema = productoSchema.partial();
