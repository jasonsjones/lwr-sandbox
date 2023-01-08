import Express from 'express';
import * as AuthController from './authController';
import * as AuthMiddleware from './authMiddleware';

const router = Express.Router();

router.post('/login', AuthMiddleware.authenticateLocal, AuthController.loginLocal);
router.post('/logout', AuthController.logout);

router.get('/sfdc', AuthMiddleware.authenticateSfdc);
router.get('/sfdc/callback', AuthMiddleware.authenticateSfdc, AuthController.loginSfdc);

router.get('/me', AuthController.getMe);

export default router;
