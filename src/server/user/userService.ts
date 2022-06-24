import { v4 } from 'uuid';
import { CreateUserDTO, User } from './types';

const users: User[] = [
    {
        id: v4(),
        name: 'James Gordon'
    },
    {
        id: v4(),
        name: 'Joe West'
    },
    {
        id: v4(),
        name: 'William Riker'
    }
];

export async function createUser(userData: CreateUserDTO): Promise<User> {
    const newUser: User = {
        id: v4(),
        name: userData.name,
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

export async function getUserBySfdcId(id: string): Promise<User | undefined> {
    const user = users.find((user) => user.sfdcUserId === id);
    return Promise.resolve(user);
}
