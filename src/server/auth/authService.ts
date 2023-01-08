import bcrypt from 'bcryptjs';
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
