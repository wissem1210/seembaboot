const express = require('express');
const router = express.Router();
var request = require('request');
var userController = require('../controllers/userController')



router.post('/addUser',userController.addUser)
router.get('/users',userController.getUsers)
router.get('/users/:userId',userController.getUserById)




router.post('/signin', userController.signin);

router.post('/authenticate', userController.authentication);


module.exports = router;