require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Las rutas de clientes y de login se agregan acá (las crean sus responsables)

app.get("/api/health", (req, res) => {
  res.json({ mensaje: "Servidor ServiTrack funcionando" });
});

conectarDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo iniciar el servidor:", error.message);
    process.exit(1);
  });