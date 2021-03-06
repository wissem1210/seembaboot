const express = require('express');
const router = express.Router();
var tournamentController = require('../controllers/tournamentController');


router.get('/tournaments', tournamentController.getAllTournaments)
router.get('/tournaments/:tournamentId', tournamentController.getTournamentById)
router.post('/addTournament', tournamentController.addTournament)
router.put('/joinTournament/:tournamentId', tournamentController.joinTournamentById)
router.put('/addRoundtoTournament/:tournamentId', tournamentController.addRoundToTournamentById)
router.get('/tournament/:id', tournamentController.initializeTournament)
router.get('/startTournament/:id', tournamentController.startTournament)
module.exports = router;