import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Password } from '@prisma/client';

// Temp reference to the (single) authenticated user until
// jwt authentication is implemented via the jwt strategy.
let authenticatedUser: User | undefined;

export function getAuthenticatedUser(): User | undefined {
    return authenticatedUser;
}

export function setAuthenticatedUser(user: User): void {
    authenticatedUser = user;
}

export function logoutAuthenticatedUser(): void {
    authenticatedUser = undefined;
}

export function verifyPassword(
    user: User & { password: Password | null },
    password: string
): boolean {
    if (user.password) {
        return bcrypt.compareSync(password, user.password.hash);
    }
    return false;
}

export function generateRefreshToken(user: Partial<User>): string {
    const payload = { sub: user.id, email: user.email };
    return jwt.sign(payload, 'refreshSecret', { expiresIn: '14d' });
}

export function generateAccessToken(user: Partial<User>): string {
    const payload = { sub: user.id, email: user.email };
    return jwt.sign(payload, 'secret', { expiresIn: '10m' });
}
