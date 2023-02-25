import cookieParser from 'cookie-parser';
import Express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import userRouter from './/user/userRouter';
import authRouter from './auth/authRouter';
import { getAuthenticatedUser } from './auth/authService';
import { configurePassport } from './config/passport';

export default function (app: Express.Application): void {
    app.use(Express.json({}));
    app.use(Express.urlencoded({ extended: false }));
    app.use(cookieParser());
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
