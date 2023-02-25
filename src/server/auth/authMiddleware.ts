import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { setAuthenticatedUser } from './authService';

export async function authenticateLocal(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate('local', { session: false }, (err, user) => {
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
    return passport.authenticate('forcedotcom', { session: false }, (err, user) => {
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

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    console.log('[Server] verifying tokens: access token then refresh token');
    console.log('[Server] access token: ');
    console.log(JSON.stringify(req.headers, null, 4));
    console.log('[Server] refresh token: ');
    if (req.cookies) {
        console.log(JSON.stringify(req.cookies, null, 4));
    } else {
        console.log('no cookies');
    }
    console.log();
    next();
}
