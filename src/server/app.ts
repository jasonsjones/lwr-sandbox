import dotenv from 'dotenv';
import Express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import userRouter from './/user/userRouter';
import { getAuthenticatedUser, logoutAuthenticatedUser } from './auth/authService';
import { configurePassport } from './config/passport';

export default function (app: Express.Application): void {
    dotenv.config();

    // custom middleware
    app.use(async (req: Request, _: Response, next: NextFunction) => {
        req.user = getAuthenticatedUser();
        next();
    });
    app.use(Express.json({}));
    app.use(Express.urlencoded({ extended: false }));
    app.use(passport.initialize());

    configurePassport(passport);

    app.get('/api/v1', (_: Request, res: Response) => {
        res.json({
            success: true,
            message: 'LWR custom API response'
        });
    });

    app.get('/api/v1/auth/sfdc', passport.authenticate('forcedotcom'), () => {
        // the request will be directed to salesforce for authentication, so this
        // callback will not be called.
    });

    app.get(
        '/auth/sfdc/callback',
        passport.authenticate('forcedotcom'),
        (req: Request, res: Response) => {
            console.log(`[Server] sfdc callback:`);
            console.log(req.user);
            res.redirect('/');
        }
    );

    app.get('/api/v1/auth/user', (req: Request, res: Response) => {
        const authUser = req.user;
        res.json({
            isAuthenticated: !!authUser,
            user: authUser || null
        });
    });

    // maybe this should be a post since it is somewhat 'destructive' in the
    // sense it does change the state...
    app.get('/api/v1/auth/logout', (_: Request, res: Response) => {
        logoutAuthenticatedUser();
        res.json({
            success: true
        });
    });

    // user routes
    app.use('/api/v1/users', userRouter);
}
