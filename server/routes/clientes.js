const express = require('express');
const router = express.Router();
const c = require('../controllers/clientesController');
const { verificarToken, soloGerencia } = require('../middleware/auth');

router.get('/', c.getClientes);
router.get('/:id', c.getClienteById);
router.post('/', c.createCliente);
router.delete('/:id', verificarToken, soloGerencia, c.deleteCliente);

module.exports = router;