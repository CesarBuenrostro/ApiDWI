const express = require('express');
const router = express.Router();
const historyController = require('../controllers//history.controller');

router.get('/history', historyController.obtainHistory);
router.post('/history', historyController.create);
router.put('/history', historyController.update);
router.delete('/history', historyController.delete);


module.exports = router;