import dotenv from 'dotenv';
import Express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import passportForceDotCom from 'passport-forcedotcom';
import { v4 } from 'uuid';
import { User } from './user/types';
import { createUser, getUserBySfdcId } from './user/userService';
import * as UserController from './user/userController';

// NOTICE: Please ignore this tangled mess of code ;-)

const sfdcInfo = {
    accessToken: '',
    instanceUrl: ''
};

// Hack to simulate "session" user, but this means this server only supports
// a single auth'd user (for now...)
let authenticated: User | undefined;

export default function (app: Express.Application): void {
    dotenv.config();
    const ForceDotComStrategy = passportForceDotCom.Strategy;

    // custom middleware
    app.use(async (req: Request, _: Response, next: NextFunction) => {
        // console.log(`[Server] ${req.method} ${req.url}`);
        req.user = authenticated;
        next();
    });
    app.use(Express.json({}));
    app.use(Express.urlencoded({ extended: false }));
    app.use(passport.initialize());

    passport.serializeUser((user, done) => {
        console.log(`[Server] Serializing user: ${JSON.stringify(user)}`);
        done(null, user);
    });

    passport.deserializeUser((user: User, done) => {
        console.log(`[Server] Deserializing user: ${JSON.stringify(user)}`);
        done(null, user);
    });

    passport.use(
        new ForceDotComStrategy(
            {
                clientID: process.env.SFDC_CLIENT_ID,
                clientSecret: process.env.SFDC_CLIENT_SECRET,
                scope: ['id', 'api'],
                callbackURL: `/auth/sfdc/callback`
            },
            async (token: any, _: any /* refreshToken */, profile: any, done: any) => {
                sfdcInfo.accessToken = token.params.access_token;
                sfdcInfo.instanceUrl = token.params.instance_url;

                console.log(sfdcInfo);

                const id = profile._raw.user_id;
                const user = await getUserBySfdcId(id);
                if (user) {
                    authenticated = user;
                    return done(null, user);
                }
                const newUser = await createUser({ name: profile.displayName, sfdcUserId: id });
                authenticated = newUser;
                return done(null, newUser);
            }
        )
    );

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
        authenticated = undefined;
        sfdcInfo.accessToken = '';
        sfdcInfo.instanceUrl = '';
        res.json({
            success: true
        });
    });

    // user routes
    app.get('/api/v1/users', UserController.getUsers);
    app.post('/api/v1/users', UserController.createUser);
    app.get('/api/v1/users/:id', UserController.getUserById);
}
