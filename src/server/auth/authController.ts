import { Request, Response, NextFunction } from 'express';
import { User } from '../user/types';
import { getUserByEmail } from '../user/userService';
import { logoutAuthenticatedUser, setAuthenticatedUser, verifyPassword } from './authService';

export async function sfdcCallback(req: Request, res: Response) {
    console.log(`[Server] sfdc callback:`);
    console.log(req.user);
    res.redirect('/');
}

export async function getMe(req: Request, res: Response) {
    const authUser = req.user;
    res.json({
        success: true,
        isAuthenticated: !!authUser,
        user: authUser || null
    });
}

export async function logout(req: Request, res: Response) {
    logoutAuthenticatedUser();
    res.json({
        success: true
    });
}

export async function login(req: Request, res: Response) {
    const { password: _, ...userInfo } = req.user as User;
    setAuthenticatedUser(req.user as User);

    res.json({
        success: true,
        accessToken: 'jwt.token.here',
        user: userInfo
    });
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (user && verifyPassword(user, password)) {
        req.user = user;
        return next();
    }

    res.status(401).json({
        success: false,
        accessToken: null,
        user: null
    });
}
