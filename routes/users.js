const express = require('express');
const router = express.Router();

const service = require('../services/users');
const private = require('../middlewares/private');

router.post('/', service.add);
router.get('/', private.checkJWT, service.getAll);
router.get('/:email', private.checkJWT, service.getByEmail);
router.put('/:email/update', private.checkJWT, service.update);
router.delete('/:email', private.checkJWT, service.delete);





module.exports = router;
