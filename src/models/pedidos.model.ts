import { pool } from "../config/db.js";
import type {z} from "zod";
import type {UpdatePedidosSchema} from "../schemas/pedidos.schema.js"

export interface Pedido {
  id: number;
  cliente_id: number;
  producto_id: number;
  cantidad: number;
  fecha: string;
}

export type CreatePedidoInput = Omit<Pedido, "id">
export type UpdatePedidoInput = z.infer<typeof UpdatePedidosSchema>;

export const PedidosModel = {
  findAll: async (): Promise<Pedido[]> => {
    const { rows } = await pool.query(
      "SELECT * FROM pedidos ORDER BY id ASC;",
    );
    return rows;
  },
    findByClienteId: async (clienteId: number): Promise<Pedido[]> => {
    const { rows } = await pool.query(
      "SELECT * FROM pedidos WHERE cliente_id = $1 ORDER BY id ASC;",
      [clienteId],
    );
    return rows;
  },
  findById: async (id: number): Promise<Pedido | null> => {
    const { rows } = await pool.query(
      "SELECT * FROM pedidos WHERE id = $1;",
      [id],
    );
    return rows[0] || null;
  },
  create: async (dato: CreatePedidoInput): Promise<Pedido> => {
    const { cliente_id, producto_id, cantidad } = dato;
    const query =
      "INSERT INTO pedidos (cliente_id , producto_id , cantidad) VALUES ($1,$2,$3) RETURNING *;";
    const { rows } = await pool.query(query, [cliente_id, producto_id, cantidad]);
    return rows[0];
  },
  update: async (
    id: number,
    dato: UpdatePedidoInput,
  ): Promise<Pedido | null> => {
    const campos = Object.keys(dato) as (keyof UpdatePedidoInput)[];

    const setClause = campos
      .map((campo, i) => `${campo} = $${i + 1}`)
      .join(", ");
    const valores = campos.map((campo) => dato[campo]);

    const { rows } = await pool.query(
      `UPDATE pedidos
            SET ${setClause}
            WHERE id = $${campos.length + 1}
            RETURNING *;
`,
      [...valores, id],
    );
    return rows[0] || null;
  },
  delete: async (id: number): Promise<boolean> => {
    const { rowCount } = await pool.query(
      "DELETE FROM pedidos WHERE id = $1;",
      [id],
    );
    return (rowCount ?? 0) > 0;
  },
};