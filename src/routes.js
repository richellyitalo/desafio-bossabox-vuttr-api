import { Router } from 'express';

import ToolController from './app/controllers/ToolController';
import UserController from './app/controllers/UserController';
import AuthMiddleware from './app/middlewares/auth';
import HomeController from './app/controllers/HomeController';

const router = new Router();

router.get('/', HomeController.index);
router.use('/doc', HomeController.documentation);

// users
router.post('/users', UserController.store);
router.post('/users/login', UserController.login);

router.use(AuthMiddleware);

// tools
router.get('/tools', ToolController.index);
router.post('/tools', ToolController.store);
router.delete('/tools/:id', ToolController.delete);

export default router;
