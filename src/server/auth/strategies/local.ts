import PassportLocal, { IVerifyOptions } from 'passport-local';
import { User } from '@prisma/client';
import { getUserByEmailIncludePassword } from '../../user/userService';
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
    const user = await getUserByEmailIncludePassword(email);

    if (!user) {
        return done(null, false, { message: 'Unable to find user' });
    }

    if (user.password && verifyPassword(user, password)) {
        return done(null, user);
    }

    return done(null, false, { message: 'Invalid email/password' });
};

export default new LocalStrategy(opts, verifyCb);
