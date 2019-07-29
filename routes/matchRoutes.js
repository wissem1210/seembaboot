const express = require('express');
const router = express.Router();
var matchController = require('../controllers/matchController');

router.get('/matchs', matchController.getAllMatchs)
router.get('/localMatchs', matchController.getAllLocalMatchs)

router.get('/match/:id', matchController.aaa)
//router.get('/matchDetail', matchController.showMatchById)
router.post('/createMatch',matchController.createLocalMatch)
//router.put('/trackMatch/:matchId',matchController.trackMatch)


module.exports = router;