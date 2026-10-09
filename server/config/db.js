const dns = require("node:dns");
const mongoose = require("mongoose");

// Conecta con MongoDB Atlas usando la URI definida en server/.env
// (variable MONGODB_URI). Si falta, el servidor no arranca: es preferible
// fallar con un mensaje claro a funcionar "a medias" sin base de datos.
const conectarDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Falta la variable MONGODB_URI en server/.env");
  }

  // Opcional: si la red de alguien bloquea la consulta DNS que necesitan las
  // URIs mongodb+srv, puede definir DNS_SERVERS=1.1.1.1,1.0.0.1 en su .env.
  // Si la variable no existe, no cambia nada.
  if (process.env.DNS_SERVERS) {
    dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()));
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("Se perdió la conexión con MongoDB");
  });

  await mongoose.connect(uri);
  console.log(`Conectado a MongoDB (base: ${mongoose.connection.name})`);
};

module.exports = conectarDB;
