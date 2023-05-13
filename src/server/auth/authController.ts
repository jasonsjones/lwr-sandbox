import { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken, logoutAuthenticatedUser } from './authService';

export async function loginLocal(req: Request, res: Response) {
    const user = req.user;
    if (user) {
        const refreshToken = generateRefreshToken(user);
        const accessToken = generateAccessToken(user);

        res.cookie('r-token', refreshToken, { httpOnly: true, sameSite: 'none', secure: true });
        res.cookie('authd', true, { httpOnly: false, sameSite: 'none', secure: true });

        return res.json({
            success: true,
            accessToken,
            user
        });
    }

    res.json({
        success: false,
        accessToken: null,
        user: null
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
    res.clearCookie('r-token');
    res.clearCookie('authd');

    logoutAuthenticatedUser();

    res.json({
        success: true,
        accessToken: 'none',
        user: null
    });
}
