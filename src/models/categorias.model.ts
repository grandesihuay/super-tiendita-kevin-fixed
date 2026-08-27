import { pool } from "../config/db.js";

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string | null;
}

export const obtenerCategorias = async (): Promise<Categoria[]> => {
  // BUG: la tabla se llama "categorias", no "categoria".
  const result = await pool.query("SELECT * FROM categoria ORDER BY id");
  return result.rows;
};

export const obtenerCategoriaPorId = async (id: number): Promise<Categoria | undefined> => {
  const result = await pool.query("SELECT * FROM categorias WHERE id = $1", [id]);
  return result.rows[0];
};

export const crearCategoria = async (data: { nombre: string; descripcion?: string }): Promise<Categoria> => {
  const result = await pool.query(
    "INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *",
    [data.nombre, data.descripcion ?? null]
  );
  return result.rows[0];
};

export const actualizarCategoria = async (
  id: number,
  data: { nombre?: string; descripcion?: string }
): Promise<Categoria | undefined> => {
  const actual = await obtenerCategoriaPorId(id);
  if (!actual) return undefined;

  const nombre = data.nombre ?? actual.nombre;
  const descripcion = data.descripcion ?? actual.descripcion;

  // BUG: los valores se mandan en un orden distinto al de los placeholders,
  // asi que nombre y descripcion terminan intercambiados en la base de datos.
  const result = await pool.query(
    "UPDATE categorias SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *",
    [descripcion, nombre, id]
  );
  return result.rows[0];
};

export const eliminarCategoria = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM categorias WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
