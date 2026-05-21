const express = require('express');
const router = express.Router();
const service = require('../services/files');
const multer = require('../middlewares/files-storage');
const private = require('../middlewares/private');

router.get('/', service.getAllFiles);
router.post('/', multer.single('file'), service.createOneFile);
router.get('/:id', service.getOneFile);
router.put('/:id', multer.single('file'), service.modifyOneFile);
router.delete('/delete', service.deleteOneFile);

module.exports = router;