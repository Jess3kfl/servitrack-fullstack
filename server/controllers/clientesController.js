const Cliente = require('../models/Cliente');

const getClientes = async (req, res, next) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    next(err);
  }
};

const getClienteById = async (req, res, next) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) {
    next(err);
  }
};

const createCliente = async (req, res, next) => {
  try {
    const nuevo = await Cliente.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

const deleteCliente = async (req, res, next) => {
  try {
    const eliminado = await Cliente.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getClientes, getClienteById, createCliente, deleteCliente };