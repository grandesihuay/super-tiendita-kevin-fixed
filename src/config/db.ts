import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  // BUG: la variable de entorno esta mal escrita (falta una "S"), asi que
  // esto siempre da undefined aunque el .env tenga DB_PASSWORD bien puesto.
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on("error", (err) => {
  console.error("Error inesperado en el pool de PostgreSQL", err);
});
