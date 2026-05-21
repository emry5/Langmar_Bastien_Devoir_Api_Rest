const express = require('express');
const router = express.Router();

const service = require('../services/catways');
const private = require('../middlewares/private');

const reservationRoute = require('./reservations');

router.get('/', private.checkJWT, service.getAll);
router.get('/:id', private.checkJWT, service.getById);
router.post('/', service.add);
router.put('/:id', private.checkJWT, service.update);
router.delete('/:id', private.checkJWT, service.delete);

/* ROUTE POUR ACCES A RESERVATIONS*/
router.use('/api/catways/:id/reservations', reservationRoute);

module.exports = router;