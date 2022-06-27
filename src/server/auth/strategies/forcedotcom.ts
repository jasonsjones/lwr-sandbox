import dotenv from 'dotenv';
import passportForceDotCom from 'passport-forcedotcom';
import { createUser, getUserBySfdcId } from '../../user/userService';
import { setAuthenticatedUser } from '../authService';

dotenv.config();
const ForceDotComStrategy = passportForceDotCom.Strategy;

const strategyOptions = {
    clientID: process.env.SFDC_CLIENT_ID,
    clientSecret: process.env.SFDC_CLIENT_SECRET,
    scope: ['id', 'api'],
    callbackURL: `/api/v1/auth/sfdc/callback`
};

async function verifyCallback(token: any, _: any /* refreshToken */, profile: any, done: any) {
    console.log(token.params);

    const { _raw, ...profileInfo } = profile;
    console.log(profileInfo);

    const { id } = profile;
    const user = await getUserBySfdcId(id);
    if (user) {
        console.log(`[Server] user already exists...`);
        setAuthenticatedUser(user);
        return done(null, user);
    }
    console.log(`[Server] user not found; creating new user...`);
    const newUser = await createUser({
        name: profile.displayName,
        email: profile.email[0].value,
        password: '',
        sfdcUserId: id
    });
    setAuthenticatedUser(newUser);
    return done(null, newUser);
}

const forcedotcomStrategy = new ForceDotComStrategy(strategyOptions, verifyCallback);

export default forcedotcomStrategy;
