const mongoose = require("mongoose");

// Misma forma de cliente que usa el frontend (ver server/documents/API.md).
const clienteSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    username: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    name: {
      firstname: { type: String, required: true, trim: true },
      lastname: { type: String, required: true, trim: true },
    },
    address: {
      city: { type: String, required: true, trim: true },
      street: { type: String, trim: true, default: "" },
      number: { type: String, trim: true, default: "" },
      zipcode: { type: String, trim: true, default: "" },
    },
  },
  {
    timestamps: true,
    toJSON: {
      // El frontend lee `id`, no `_id`: se expone `id` y se oculta `_id`.
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Cliente", clienteSchema);
