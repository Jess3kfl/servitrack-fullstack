const mongoose = require("mongoose");

// Usuarios del sistema (login). La contraseña se guarda siempre hasheada
// (campo `passwordHash`); nunca en texto plano.
const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    sector: { type: String, required: true, enum: ["Soporte", "Gerencia"] },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.passwordHash; // el hash nunca sale en una respuesta
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Usuario", usuarioSchema);
