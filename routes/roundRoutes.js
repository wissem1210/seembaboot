const express = require('express');
const router = express.Router();
var roundController = require('../controllers/roundController');


router.post('/createRound',roundController.addRound)
router.put('/joinRound/:roundId',roundController.joinRoundById)
router.get('/rounds',roundController.getAllRounds)



module.exports = router;