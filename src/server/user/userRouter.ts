import Express from 'express';
import * as UserController from './userController';

const router = Express.Router();

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);
router.get('/:id', UserController.getUserById);

export default router;
