# ServiTrack - Panel de Control de Clientes

Integración de un backend propio (Node.js + base de datos) para reemplazar la API pública de prueba del frontend del TP1.

## Estructura del proyecto
- `client/`: frontend en React + Vite (versión evaluada del TP1).
- `server/`: backend en construcción.
  - `controllers/`, `documents/`, `middleware/`, `models/`, `routes/`

## Cómo correr el cliente
1. `cd client`
2. `npm install`
3. `npm run dev`
4. Abrir `http://localhost:5173`

## Servidor
El servidor usará el puerto `3001`. Está en construcción.

## Documentación
El contrato de la API (rutas y formato de los datos) está en [`server/documents/API.md`](server/documents/API.md).

## Cómo correr el servidor

1. Entrar a server/ e instalar dependencias: npm install
2. Copiar .env.example como .env y completar MONGODB_URI, JWT_SECRET y SEED_PASSWORD (el .env no se sube a GitHub).
3. Cargar datos de prueba (solo la primera vez): npm run seed
4. Iniciar el servidor: npm run dev
5. Verificar en http://localhost:3001/api/health

Rutas principales: POST /api/auth/login y /api/clientes (GET, POST, DELETE). El detalle está en server/documents/API.md.