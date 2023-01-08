import dotenv from 'dotenv';
import passportForceDotCom from 'passport-forcedotcom';
import { createUser, getUserBySfdcId } from '../../user/userService';

dotenv.config();
const ForceDotComStrategy = passportForceDotCom.Strategy;

const strategyOptions = {
    clientID: process.env.SFDC_CLIENT_ID,
    clientSecret: process.env.SFDC_CLIENT_SECRET,
    scope: ['id', 'api'],
    callbackURL: `/api/v1/auth/sfdc/callback`
};

async function verifyCallback(token: any, _: any /* refreshToken */, profile: any, done: any) {
    console.log(`[Server] Token params:`);
    console.log(token.params);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _raw, ...profileInfo } = profile;
    console.log(`[Server] SFDC profile info:`);
    console.log(profileInfo);

    const { id } = profile;
    const user = await getUserBySfdcId(id);
    if (user) {
        console.log(`[Server] user already exists...`);
        return done(null, user);
    }
    console.log(`[Server] user not found; creating new user...`);
    const newUser = await createUser({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        sfdcUserId: id
    });
    return done(null, newUser);
}

const forcedotcomStrategy = new ForceDotComStrategy(strategyOptions, verifyCallback);

export default forcedotcomStrategy;
