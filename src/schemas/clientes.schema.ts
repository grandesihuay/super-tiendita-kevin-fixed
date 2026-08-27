import { z } from "zod";

export const clienteSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  // BUG: falta validar que el email realmente tenga formato de email.
  email: z.string().min(5, "El email es requerido"),
  telefono: z.string().optional(),
});

export const actualizarClienteSchema = clienteSchema.partial();
