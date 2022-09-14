const express = require('express');
const multiparty = require('connect-multiparty');


const UserController = require('../controllers/user');

const md_auth = require('../middlewares/authenticate');

const md_upload_avatar = multiparty({uploadDir: __dirname + '/../uploads'})
const api = express.Router();

api.post('/register', UserController.register);
api.post('/login', UserController.login);

api.get('/protected', [md_auth.ensureAuth] ,UserController.protected);

api.put('/upload-avatar/:id',[md_auth.ensureAuth, md_upload_avatar], UserController.uploadAvatar);
api.get('/avatar/:avatarName', UserController.getAvatar);

module.exports = api;