const express = require('express');
const Router = express.Router();
const userController = require('../controller/user');

Router
    .get('/', userController.userGet)
    .get('/:id_user', userController.userDetail)
    .post('/login', userController.login)
    .post('/activation', userController.aktifasi)
    .post('/', userController.register)
    .patch('/update/:id_user', userController.updateUser)
    .delete('/:id_user', userController.deleteUser)
module.exports = Router