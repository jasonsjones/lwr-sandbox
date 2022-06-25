import Express from 'express';
import passport from 'passport';
import * as AuthController from './authController';

const router = Express.Router();

router.get('/sfdc', passport.authenticate('forcedotcom'), () => {
    // the request will be directed to salesforce for authentication, so this
    // callback will not be called.
});
router.get('/sfdc/callback', passport.authenticate('forcedotcom'), AuthController.sfdcCallback);
router.get('/me', AuthController.getMe);

// maybe this should be a post since it is somewhat 'destructive' in the
// sense it does change the state...
router.get('/logout', AuthController.logout);

export default router;
