import { Request, Response } from 'express';
import { logoutAuthenticatedUser } from './authService';

export async function loginLocal(req: Request, res: Response) {
    const user = req.user;
    res.json({
        success: true,
        accessToken: 'jwt.token.here',
        user
    });
}

export async function loginSfdc(req: Request, res: Response) {
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
        success: true,
        accessToken: 'none',
        user: null
    });
}
