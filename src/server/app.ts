import dotenv from 'dotenv';
import Express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import passportForceDotCom from 'passport-forcedotcom';
import { v4 } from 'uuid';

// NOTICE: Please ignore this tangled mess of code ;-)
interface User {
    id: string;
    name: string;
    sfdcUserId?: string;
}

const users: User[] = [
    {
        id: v4(),
        name: 'James Gordon'
    },
    {
        id: v4(),
        name: 'Joe West'
    },
    {
        id: v4(),
        name: 'William Riker'
    }
];

// Hack to simulate "session" user, but this means this server only supports
// a single auth'd user (for now...)
let autheticatedUser: User | undefined;

function getUserBySfdcId(id: string): User | undefined {
    const user = users.find((user) => user.sfdcUserId === id);
    return user;
}

export default function (app: Express.Application): void {
    dotenv.config();
    const ForceDotComStrategy = passportForceDotCom.Strategy;

    // custom middleware
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        // console.log(`[Server] ${req.method} ${req.url}`);
        req.user = autheticatedUser;
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
                scope: ['id'],
                callbackURL: 'http://localhost:4200/auth/sfdc/callback'
            },
            (token: any, refreshToken: any, profile: any, done: any) => {
                const id = profile._raw.user_id;
                const user = getUserBySfdcId(id);
                if (user) {
                    autheticatedUser = user;
                    return done(null, user);
                }
                const newUser: User = {
                    id: v4(),
                    name: profile.displayName,
                    sfdcUserId: id
                };
                users.push(newUser);
                autheticatedUser = newUser;
                return done(null, newUser);
            }
        )
    );

    app.get('/api/v1', (req: Request, res: Response) => {
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
    app.get('/api/v1/auth/logout', (req: Request, res: Response) => {
        autheticatedUser = undefined;
        res.json({
            success: true
        });
    });

    app.get('/api/v1/users', (req: Request, res: Response) => {
        res.json({ users });
    });

    app.post('/api/v1/users', (req: Request, res: Response) => {
        const newUser = {
            id: v4(),
            name: req.body.name
        };
        users.push(newUser);
        res.status(201).json(newUser);
    });

    app.get('/api/v1/users/:id', (req: Request, res: Response) => {
        const { id } = req.params;
        const user = users.find((user) => user.id === id);
        res.json(user ?? null);
    });
}
