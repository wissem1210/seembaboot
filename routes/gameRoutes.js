const express = require('express');
const router = express.Router();
var gameController = require('../controllers/gameController');


router.get('/games',gameController.getAllGames)
router.post('/addGame',gameController.addGame)
module.exports = router;