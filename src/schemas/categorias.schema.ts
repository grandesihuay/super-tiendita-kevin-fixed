import { z } from "zod";

export const categoriaSchema = z.object({
  nombre: z.string({ error: "El nombre es Requerido" }).trim().min(1),
  descripcion: z.string().trim().optional(),
});

export const actualizarCategoriaSchema = categoriaSchema.partial();
