const express = require('express');
const router = express.Router();
var request = require('request');
var userController = require('../controllers/userController')



router.post('/addUser',userController.addUser)
router.get('/users',userController.getUsers)
router.get('/users/:userId',userController.getUserById)




router.post('/signin', userController.signin);

router.post('/authenticate', userController.authentication);



router.post('/login', userController.login);
router.get('/usersInfo', userController.show)


module.exports = router;