const express = require('express');

const taskController = require('../controllers/task');

const md_auth = require('../middlewares/authenticate');

const api = express.Router();

api.post('/task',[md_auth.ensureAuth], taskController.createTask);
api.get('/task/:id',[md_auth.ensureAuth], taskController.getATask);
api.get('/task',[md_auth.ensureAuth], taskController.getTask);
api.put('/task/:id', taskController.updateTask);
api.delete('/task/:id', taskController.deleteTask);

module.exports = api;