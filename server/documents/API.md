# Contrato de la API - ServiTrack

Servidor: `http://localhost:3001/api`

## Autenticación
### POST /api/auth/login
- Recibe: `email`, `password`, `sector`
- Devuelve: `{ token, usuario: { nombre, email, sector } }`

## Clientes
### GET /api/clientes
Devuelve la lista de clientes. El frontend filtra por apellido y ciudad.

### GET /api/clientes/:id
Devuelve un cliente.

### POST /api/clientes
Crea un cliente. Devuelve el cliente creado con su `id`.

### DELETE /api/clientes/:id
- Header: `Authorization: Bearer <token>`
- Devuelve: `{ mensaje }`
- Errores: 401 (sesión expirada o sin autorización), 403 (se requiere rol Gerencia)

## Forma de un cliente
```json
{
  "id": "...",
  "email": "...",
  "username": "...",
  "phone": "...",
  "name": { "firstname": "...", "lastname": "..." },
  "address": { "city": "...", "street": "...", "number": "...", "zipcode": "..." }
}
```

## Notas para el equipo
- El frontend lee `id`, no `_id`: el modelo debe devolver `id`.
- Hoy el frontend apunta a puertos distintos (4000 en login, 3000 en eliminar) y a `fakestoreapi.com`: hay que unificar todo en `http://localhost:3001/api` mediante `VITE_API_URL`.