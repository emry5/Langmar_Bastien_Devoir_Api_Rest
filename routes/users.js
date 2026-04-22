const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');

router.post('/add', service.add);
router.post('/authenticate', service.authenticate);
router.get('/:id', private.checkJWT, service.getById);
router.patch('/:id', private.checkJWT, service.update);
router.delete('/:id', private.checkJWT, service.delete);


module.exports = router;
