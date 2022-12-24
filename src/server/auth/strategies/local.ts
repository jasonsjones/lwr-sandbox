import PassportLocal, { IVerifyOptions } from 'passport-local';
import { User } from '../../user/types';
import { getUserByEmail } from '../../user/userService';
import { verifyPassword } from '../authService';

const LocalStrategy = PassportLocal.Strategy;

const opts = {
    usernameField: 'email'
};

const verifyCb: PassportLocal.VerifyFunction = async (
    email: string,
    password: string /* password */,
    done: (error: any, user?: User | boolean, options?: IVerifyOptions) => void
): Promise<void> => {
    const user = await getUserByEmail(email);

    if (!user) {
        return done(null, false, { message: 'Unable to find user' });
    }

    if (verifyPassword(user, password)) {
        return done(null, user);
    }

    return done(null, false, { message: 'Invalid email/password' });
};

export default new LocalStrategy(opts, verifyCb);
