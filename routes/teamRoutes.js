const express = require('express');
const router = express.Router();
var teamController = require('../controllers/teamController');


router.post('/addTeam',teamController.addTeam)
router.get('/teams',teamController.getTeamsPerTournament)
router.get('/teams/:teamId',teamController.getTeamById)
router.put('/joinTeam/:teamId',teamController.joinTeamById)

module.exports = router;