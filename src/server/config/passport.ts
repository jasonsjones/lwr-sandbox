import { PassportStatic } from 'passport';
import { User } from '../user/types';
import forcedotcomStrategy from '../auth/strategies/forcedotcom';
import localStrategy from '../auth/strategies/local';

export function configurePassport(passport: PassportStatic) {
    passport.serializeUser((user, done) => {
        console.log(`[Server] Serializing user: ${JSON.stringify(user)}`);
        done(null, user);
    });

    passport.deserializeUser((user: User, done) => {
        console.log(`[Server] Deserializing user: ${JSON.stringify(user)}`);
        done(null, user);
    });

    passport.use(localStrategy);
    passport.use(forcedotcomStrategy);
}
