const express = require('express');
const router = express.Router();

// Controller
const TaskController = require('../controllers/task.controller');

// Middlewares
const MeMiddleware = require('../middlewares/me.middleware');

router.get('/', MeMiddleware.getUser, TaskController.find);
router.get('/id/:id', MeMiddleware.getUser, TaskController.findOne);

router.post('/add', MeMiddleware.getUser, TaskController.create);

router.put('/id/:id', MeMiddleware.getUser, TaskController.edit)

router.delete('/id/:id', MeMiddleware.getUser, TaskController.delete);

router.get('/states', MeMiddleware.getUser, TaskController.getStates);

module.exports = router;