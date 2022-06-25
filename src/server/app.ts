import Express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import authRouter from './auth/authRouter';
import userRouter from './/user/userRouter';
import { getAuthenticatedUser } from './auth/authService';
import { configurePassport } from './config/passport';

export default function (app: Express.Application): void {
    app.use(Express.json({}));
    app.use(Express.urlencoded({ extended: false }));
    app.use(passport.initialize());

    configurePassport(passport);

    // custom middleware
    app.use(async (req: Request, _: Response, next: NextFunction) => {
        req.user = getAuthenticatedUser();
        next();
    });

    app.get('/api/v1', (_: Request, res: Response) => {
        res.json({
            success: true,
            message: 'LWR custom API response'
        });
    });

    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
}
