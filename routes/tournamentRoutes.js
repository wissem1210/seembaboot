const express = require('express');
const router = express.Router();
var tournamentController = require('../controllers/tournamentController');


router.get('/tournaments',tournamentController.getAllTournaments)
router.get('/tournaments/:tournamentId',tournamentController.getTournamentById)
router.post('/addTournament',tournamentController.addTournament)
module.exports = router;