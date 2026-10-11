const express = require('express');
const router = express.Router();
const c = require('../controllers/clientesController');
const { verifyToken, requireGerencia } = require('../middleware/auth');

router.get('/', c.getClientes);
router.get('/:id', c.getClienteById);
router.post('/', c.createCliente);
router.delete('/:id', verifyToken, requireGerencia, c.deleteCliente);

module.exports = router;