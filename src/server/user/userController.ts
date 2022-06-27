import { Request, Response } from 'express';
import { User } from './types';
import * as UserService from './userService';

export async function createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const newUser = await UserService.createUser({ name, email, password });
    const sanitizedUser = UserService.sanitizeUser(newUser);

    res.status(201).json(sanitizedUser);
}

export async function getUsers(_: Request, res: Response) {
    const users = await UserService.getUsers();
    const sanitizedUsers = users.map(UserService.sanitizeUser);
    res.json({ users: sanitizedUsers });
}

export async function getUserById(req: Request, res: Response) {
    const user = await UserService.getUserById(req.params.id);
    if (user) {
        const sanitizedUser = UserService.sanitizeUser(user);
        res.json(sanitizedUser);
    } else {
        res.json(null);
    }
}
