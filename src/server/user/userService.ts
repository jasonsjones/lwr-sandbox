import { v4 } from 'uuid';
import { CreateUserDTO, User } from './types';
import { users } from './users';

export async function createUser(userData: CreateUserDTO): Promise<User> {
    const newUser: User = {
        id: v4(),
        name: userData.name,
        email: userData.email,
        password: process.env.DEFAULT_PASSWORD || 'password', // WARNING: don't do this! Need to hash the password
        sfdcUserId: userData.sfdcUserId
    };
    users.push(newUser);
    return Promise.resolve(newUser);
}

export async function getUsers(): Promise<User[]> {
    return Promise.resolve(users);
}

export async function getUserById(id: string): Promise<User | undefined> {
    const user = users.find((user) => user.id === id);
    return Promise.resolve(user);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
    const user = users.find((user) => user.email === email);
    return Promise.resolve(user);
}

export async function getUserBySfdcId(id: string): Promise<User | undefined> {
    const user = users.find((user) => user.sfdcUserId === id);
    return Promise.resolve(user);
}

export function sanitizeUser(user: User) {
    const { password, ...clientSideInfo } = user;
    return {
        ...clientSideInfo
    };
}
