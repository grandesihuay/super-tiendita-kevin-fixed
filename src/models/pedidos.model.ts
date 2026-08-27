import { pool } from "../config/db.js";

export interface Pedido {
  id: number;
  cliente_id: number;
  producto_id: number;
  cantidad: number;
  fecha: string;
}

export const obtenerPedidos = async (): Promise<Pedido[]> => {
  const result = await pool.query("SELECT * FROM pedidos ORDER BY id");
  return result.rows;
};

export const obtenerPedidoPorId = async (id: number): Promise<Pedido | undefined> => {
  const result = await pool.query("SELECT * FROM pedidos WHERE id = $1", [id]);
  return result.rows[0];
};

export const obtenerPedidosPorCliente = async (clienteId: number): Promise<Pedido[]> => {
  const result = await pool.query("SELECT * FROM pedidos WHERE cliente_id = $1 ORDER BY id", [clienteId]);
  return result.rows;
};

export const crearPedido = async (data: {
  cliente_id: number;
  producto_id: number;
  cantidad: number;
}): Promise<Pedido> => {
  // BUG: el metodo se llama "query", no "qeury".
  const result = await pool.qeury(
    "INSERT INTO pedidos (cliente_id, producto_id, cantidad) VALUES ($1, $2, $3) RETURNING *",
    [data.cliente_id, data.producto_id, data.cantidad]
  );
  return result.rows[0];
};

export const actualizarPedido = async (
  id: number,
  data: Partial<{ cliente_id: number; producto_id: number; cantidad: number }>
): Promise<Pedido | undefined> => {
  const actual = await obtenerPedidoPorId(id);
  if (!actual) return undefined;

  const cliente_id = data.cliente_id ?? actual.cliente_id;
  const producto_id = data.producto_id ?? actual.producto_id;
  const cantidad = data.cantidad ?? actual.cantidad;

  const result = await pool.query(
    "UPDATE pedidos SET cliente_id = $1, producto_id = $2, cantidad = $3 WHERE id = $4 RETURNING *",
    [cliente_id, producto_id, cantidad, id]
  );
  return result.rows[0];
};

export const eliminarPedido = async (id: number): Promise<boolean> => {
  // BUG: la tabla se llama "pedidos", no "pedido".
  const result = await pool.query("DELETE FROM pedido WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};
