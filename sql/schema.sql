-- =====================================================
-- La Super Tiendita de Kevin - Script de base de datos
-- =====================================================
-- Ejecuta este script completo en tu base de datos de PostgreSQL
-- (por ejemplo con psql, pgAdmin o DBeaver) ANTES de correr la API.
--
-- 1. Crea una base de datos vacia, por ejemplo:
--      CREATE DATABASE la_super_tiendita;
-- 2. Conectate a esa base de datos.
-- 3. Corre todo el contenido de este archivo.
-- =====================================================

DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS categorias;

-- Categorias de productos (ej: Bebidas, Snacks, Limpieza)
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
);

-- Productos que se venden en la tiendita
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL
);

-- Clientes de la tiendita
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20)
);

-- Pedidos hechos por los clientes
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    producto_id INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE
);

-- =====================================================
-- Datos de ejemplo (opcional, pero ayuda a probar la API)
-- =====================================================

INSERT INTO categorias (nombre, descripcion) VALUES
    ('Bebidas', 'Jugos, gaseosas y agua'),
    ('Snacks', 'Papitas, galletas y dulces'),
    ('Limpieza', 'Productos para el hogar');

INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES
    ('Coca Cola 600ml', 1.50, 50, 1),
    ('Papas Lays', 1.25, 30, 2),
    ('Jabon Liquido', 3.75, 15, 3);

INSERT INTO clientes (nombre, email, telefono) VALUES
    ('Ana Perez', 'ana.perez@example.com', '8888-1111'),
    ('Luis Gomez', 'luis.gomez@example.com', '8888-2222');

INSERT INTO pedidos (cliente_id, producto_id, cantidad) VALUES
    (1, 1, 3),
    (2, 2, 1);
