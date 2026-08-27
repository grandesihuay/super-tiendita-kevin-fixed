// Documento OpenAPI escrito a mano (sin swagger-jsdoc) para mantener
// las dependencias al minimo. Se sirve con swagger-ui-express en /api-docs.

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "La Super Tiendita de Kevin - API",
    version: "1.0.0",
    description:
      "API sencilla con CRUD para categorias, productos, clientes y pedidos.",
  },
  servers: [{ url: "/api" }],
  tags: [
    { name: "Categorias" },
    { name: "Productos" },
    { name: "Clientes" },
    { name: "Pedidos" },
  ],
  components: {
    schemas: {
      Categoria: {
        type: "object",
        properties: {
          id: { type: "integer", readOnly: true },
          nombre: { type: "string" },
          descripcion: { type: "string" },
        },
        required: ["nombre"],
      },
      Producto: {
        type: "object",
        properties: {
          id: { type: "integer", readOnly: true },
          nombre: { type: "string" },
          precio: { type: "number", format: "float" },
          stock: { type: "integer" },
          categoria_id: { type: "integer" },
        },
        required: ["nombre", "precio", "categoria_id"],
      },
      Cliente: {
        type: "object",
        properties: {
          id: { type: "integer", readOnly: true },
          nombre: { type: "string" },
          email: { type: "string", format: "email" },
          telefono: { type: "string" },
        },
        required: ["nombre", "email"],
      },
      Pedido: {
        type: "object",
        properties: {
          id: { type: "integer", readOnly: true },
          cliente_id: { type: "integer" },
          producto_id: { type: "integer" },
          cantidad: { type: "integer" },
          fecha: { type: "string", format: "date", readOnly: true },
        },
        required: ["cliente_id", "producto_id", "cantidad"],
      },
      Error: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
    },
  },
  paths: {
    "/categorias": {
      get: {
        tags: ["Categorias"],
        summary: "Listar todas las categorias",
        responses: {
          200: {
            description: "Lista de categorias",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Categoria" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Categorias"],
        summary: "Crear una categoria",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Categoria" },
            },
          },
        },
        responses: {
          201: { description: "Categoria creada" },
          400: { description: "Datos invalidos" },
        },
      },
    },
    "/categorias/{id}": {
      get: {
        tags: ["Categorias"],
        summary: "Obtener una categoria por id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "Categoria encontrada" },
          404: { description: "No encontrada" },
        },
      },
      put: {
        tags: ["Categorias"],
        summary: "Actualizar una categoria",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Categoria" },
            },
          },
        },
        responses: {
          200: { description: "Categoria actualizada" },
          404: { description: "No encontrada" },
        },
      },
      delete: {
        tags: ["Categorias"],
        summary: "Eliminar una categoria",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "Categoria eliminada" },
          404: { description: "No encontrada" },
        },
      },
    },
    "/productos": {
      get: {
        tags: ["Productos"],
        summary: "Listar todos los productos",
        responses: { 200: { description: "Lista de productos" } },
      },
      post: {
        tags: ["Productos"],
        summary: "Crear un producto",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Producto" },
            },
          },
        },
        responses: { 201: { description: "Producto creado" }, 400: { description: "Datos invalidos" } },
      },
    },
    "/productos/{id}": {
      get: {
        tags: ["Productos"],
        summary: "Obtener un producto por id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Producto encontrado" }, 404: { description: "No encontrado" } },
      },
      put: {
        tags: ["Productos"],
        summary: "Actualizar un producto",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Producto" },
            },
          },
        },
        responses: { 200: { description: "Producto actualizado" }, 404: { description: "No encontrado" } },
      },
      delete: {
        tags: ["Productos"],
        summary: "Eliminar un producto",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Producto eliminado" }, 404: { description: "No encontrado" } },
      },
    },
    "/clientes": {
      get: {
        tags: ["Clientes"],
        summary: "Listar todos los clientes",
        responses: { 200: { description: "Lista de clientes" } },
      },
      post: {
        tags: ["Clientes"],
        summary: "Crear un cliente",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cliente" },
            },
          },
        },
        responses: { 201: { description: "Cliente creado" }, 400: { description: "Datos invalidos" } },
      },
    },
    "/clientes/{id}": {
      get: {
        tags: ["Clientes"],
        summary: "Obtener un cliente por id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Cliente encontrado" }, 404: { description: "No encontrado" } },
      },
      put: {
        tags: ["Clientes"],
        summary: "Actualizar un cliente",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Cliente" },
            },
          },
        },
        responses: { 200: { description: "Cliente actualizado" }, 404: { description: "No encontrado" } },
      },
      delete: {
        tags: ["Clientes"],
        summary: "Eliminar un cliente",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Cliente eliminado" }, 404: { description: "No encontrado" } },
      },
    },
    "/pedidos": {
      get: {
        tags: ["Pedidos"],
        summary: "Listar todos los pedidos",
        responses: { 200: { description: "Lista de pedidos" } },
      },
      post: {
        tags: ["Pedidos"],
        summary: "Crear un pedido",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Pedido" },
            },
          },
        },
        responses: { 201: { description: "Pedido creado" }, 400: { description: "Datos invalidos" } },
      },
    },
    "/pedidos/cliente/{clienteId}": {
      get: {
        tags: ["Pedidos"],
        summary: "Listar los pedidos de un cliente",
        parameters: [{ name: "clienteId", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Pedidos del cliente" } },
      },
    },
    "/pedidos/{id}": {
      get: {
        tags: ["Pedidos"],
        summary: "Obtener un pedido por id",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Pedido encontrado" }, 404: { description: "No encontrado" } },
      },
      put: {
        tags: ["Pedidos"],
        summary: "Actualizar un pedido",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Pedido" },
            },
          },
        },
        responses: { 200: { description: "Pedido actualizado" }, 404: { description: "No encontrado" } },
      },
      delete: {
        tags: ["Pedidos"],
        summary: "Eliminar un pedido",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Pedido eliminado" }, 404: { description: "No encontrado" } },
      },
    },
  },
};
