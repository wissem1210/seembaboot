const express = require('express');
const router = express.Router();
var tournamentController = require('../controllers/tournamentController');


router.get('/tournaments',tournamentController.getAllTournaments)
router.post('/addTournament',tournamentController.addTournament)
module.exports = router;