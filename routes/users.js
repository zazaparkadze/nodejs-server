const express = require('express');
const router = express.Router();
const roles_list = require('../config/roles_list');

const usersController = require('../controllers/usersController')
const verifyROLES = require('../middleware/verifyROLES');

router.route('/')
    .get(usersController.getAllUsers) 
    .post(usersController.createUser)
    .put(verifyROLES(roles_list.admin, roles_list.editor), usersController.updateUser) //,
    .delete(verifyROLES(roles_list.admin),usersController.deleteUser); //

router.route('/:_id').get(usersController.getUser);

module.exports = router;