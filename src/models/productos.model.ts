import { pool } from "../config/db.js";

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria_id: number;
}

export const obtenerProductos = async (): Promise<Producto[]> => {
  const result = await pool.query("SELECT * FROM productos ORDER BY id");
  return result.rows;
};

export const obtenerProductoPorId = async (id: number): Promise<Producto | undefined> => {
  // BUG: la columna se llama "id", no "i".
  const result = await pool.query("SELECT * FROM productos WHERE i = $1", [id]);
  return result.rows[0];
};

export const crearProducto = async (data: {
  nombre: string;
  precio: number;
  stock: number;
  categoria_id: number;
}): Promise<Producto> => {
  // BUG: falta el "await", asi que "result" es una Promise y no un QueryResult.
  const result = pool.query(
    "INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [data.nombre, data.precio, data.stock, data.categoria_id]
  );
  return result.rows[0];
};

export const actualizarProducto = async (
  id: number,
  data: Partial<{ nombre: string; precio: number; stock: number; categoria_id: number }>
): Promise<Producto | undefined> => {
  const actual = await obtenerProductoPorId(id);
  if (!actual) return undefined;

  const nombre = data.nombre ?? actual.nombre;
  const precio = data.precio ?? actual.precio;
  const stock = data.stock ?? actual.stock;
  const categoria_id = data.categoria_id ?? actual.categoria_id;

  const result = await pool.query(
    "UPDATE productos SET nombre = $1, precio = $2, stock = $3, categoria_id = $4 WHERE id = $5 RETURNING *",
    [nombre, precio, stock, categoria_id, id]
  );
  return result.rows[0];
};

export const eliminarProducto = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM productos WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
