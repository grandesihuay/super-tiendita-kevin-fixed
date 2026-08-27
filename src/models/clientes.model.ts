import { pool } from "../config/db.js";

export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
}

export const obtenerClientes = async (): Promise<Cliente[]> => {
  const result = await pool.query("SELECT * FROM clientes ORDER BY id");
  return result.rows;
};

export const obtenerClientePorId = async (id: number): Promise<Cliente | undefined> => {
  const result = await pool.query("SELECT * FROM clientes WHERE id = $1", [id]);
  return result.rows[0];
};

export const crearCliente = async (data: {
  nombre: string;
  email: string;
  telefono?: string;
}): Promise<Cliente> => {
  // BUG: la columna "telefono" no esta en el INSERT, asi que aunque el
  // cliente la mande siempre se guarda como null.
  const result = await pool.query(
    "INSERT INTO clientes (nombre, email) VALUES ($1, $2) RETURNING *",
    [data.nombre, data.email, data.telefono ?? null]
  );
  return result.rows[0];
};

export const actualizarCliente = async (
  id: number,
  data: Partial<{ nombre: string; email: string; telefono: string }>
): Promise<Cliente | undefined> => {
  const actual = await obtenerClientePorId(id);
  if (!actual) return undefined;

  const nombre = data.nombre ?? actual.nombre;
  const email = data.email ?? actual.email;
  const telefono = data.telefono ?? actual.telefono;

  const result = await pool.query(
    "UPDATE clientes SET nombre = $1, email = $2, telefono = $3 WHERE id = $4 RETURNING *",
    [nombre, email, telefono, id]
  );
  return result.rows[0];
};

export const eliminarCliente = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
