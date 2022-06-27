import dotenv from 'dotenv';
import { v4 } from 'uuid';
import { CreateUserDTO, User } from './types';

dotenv.config();

const users: User[] = [
    {
        id: v4(),
        name: 'James Gordon',
        email: 'jgordon@gotham.gov',
        password: process.env.DEFAULT_PASSWORD || 'password'
    },
    {
        id: v4(),
        name: 'Joe West',
        email: 'jwest@centralcity.gov',
        password: process.env.DEFAULT_PASSWORD || 'password'
    },
    {
        id: v4(),
        name: 'William Riker',
        email: 'xo@ncc1701.mil',
        password: process.env.DEFAULT_PASSWORD || 'password'
    }
];

export async function createUser(userData: CreateUserDTO): Promise<User> {
    const newUser: User = {
        id: v4(),
        name: userData.name,
        email: userData.email,
        password: process.env.DEFAULT_PASSWORD || 'password',
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
    const { password, ...userInfo } = user;
    return {
        ...userInfo
    };
}
