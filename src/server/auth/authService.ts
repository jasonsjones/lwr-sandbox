import { User } from '../user/types';

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

export function verifyPassword(user: User, password: string): boolean {
    return user.password === password;
}
