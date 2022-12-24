import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { setAuthenticatedUser } from './authService';

export async function authenticateLocal(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                accessToken: null,
                user: null
            });
        }

        req.user = user;
        setAuthenticatedUser(user);
        next();
    })(req, res, next);
}

export async function authenticateSfdc(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate('forcedotcom', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (user) {
            req.user = user;
            setAuthenticatedUser(user);
        }
        next();
    })(req, res, next);
}
