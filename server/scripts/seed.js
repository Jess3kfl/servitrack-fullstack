// Carga datos de prueba en MongoDB: un usuario por sector y varios clientes.
//
//   cd server
//   npm run seed
//
// Es seguro correrlo más de una vez: busca por email y actualiza o crea
// (no borra nada). La contraseña de los usuarios de prueba NO está en el
// código: se toma de SEED_PASSWORD en server/.env, así no queda ninguna
// contraseña en texto plano dentro del repositorio.

require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const conectarDB = require("../config/db");
const Usuario = require("../models/Usuario");
const Cliente = require("../models/Cliente");

const usuarios = [
  { nombre: "Gerencia Demo", email: "gerencia@servitrack.com", sector: "Gerencia" },
  { nombre: "Soporte Demo", email: "soporte@servitrack.com", sector: "Soporte" },
];

const cliente = (firstname, lastname, ciudad, calle, numero, zipcode, telefono) => ({
  email: `${firstname}.${lastname}@mail.com`.toLowerCase(),
  username: `${firstname}${lastname}`.toLowerCase(),
  phone: telefono,
  name: { firstname, lastname },
  address: { city: ciudad, street: calle, number: numero, zipcode },
});

const clientes = [
  cliente("Marcos", "Aguirre", "Salta", "Av. Belgrano", "1250", "4400", "387-4123456"),
  cliente("Lucía", "Fernández", "Salta", "Calle Zuviría", "340", "4400", "387-4234567"),
  cliente("Pablo", "Ramos", "Salta", "Av. San Martín", "980", "4400", "387-4345678"),
  cliente("Valeria", "Cruz", "San Salvador de Jujuy", "Av. Fascio", "615", "4600", "388-4456789"),
  cliente("Diego", "Torres", "San Salvador de Jujuy", "Calle Lavalle", "270", "4600", "388-4567890"),
  cliente("Carolina", "Mamaní", "Palpalá", "Av. Hipólito Yrigoyen", "45", "4612", "388-4678901"),
  cliente("Sergio", "Vargas", "San Miguel de Tucumán", "Av. Mate de Luna", "1830", "4000", "381-4789012"),
  cliente("Natalia", "Gómez", "San Miguel de Tucumán", "Calle Muñecas", "512", "4000", "381-4890123"),
  cliente("Javier", "Ledesma", "San Miguel de Tucumán", "Av. Sarmiento", "760", "4000", "381-4901234"),
  cliente("Romina", "Castillo", "Tartagal", "Calle Alberdi", "128", "4560", "387-4012345"),
  cliente("Facundo", "Rojas", "San Ramón de la Nueva Orán", "Calle Pellegrini", "390", "4530", "387-4123987"),
  cliente("Andrea", "Quiroga", "Salta", "Calle Mitre", "205", "4400", "387-4234098"),
];

const sembrar = async () => {
  const password = process.env.SEED_PASSWORD;
  if (!password) {
    throw new Error("Falta SEED_PASSWORD en server/.env (contraseña de los usuarios de prueba)");
  }

  await conectarDB();

  const passwordHash = await bcrypt.hash(password, 10);

  for (const u of usuarios) {
    await Usuario.updateOne({ email: u.email }, { $set: { ...u, passwordHash } }, { upsert: true });
  }
  for (const c of clientes) {
    await Cliente.updateOne({ email: c.email }, { $set: c }, { upsert: true });
  }

  console.log(`Seed listo: ${usuarios.length} usuarios y ${clientes.length} clientes`);
  await mongoose.disconnect();
};

sembrar().catch(async (error) => {
  console.error("Error en el seed:", error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
