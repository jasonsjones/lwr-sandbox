import Express from 'express';
import passport from 'passport';
import * as AuthController from './authController';

const router = Express.Router();

router.get('/sfdc', passport.authenticate('forcedotcom'), () => {
    // the request will be directed to salesforce for authentication, so this
    // callback will not be called.
});

// Skip using passport-local strategy for now so we can have a bit more control over
// the shape of the 401 response.  Using custom 'authenticate' middleware.

// router.post('/login', passport.authenticate('local'), AuthController.login);
router.post('/login', AuthController.authenticate, AuthController.login);
router.get('/sfdc/callback', passport.authenticate('forcedotcom'), AuthController.sfdcCallback);
router.get('/me', AuthController.getMe);

router.post('/logout', AuthController.logout);

export default router;
