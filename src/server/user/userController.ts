import { Request, Response } from 'express';
import * as UserService from './userService';

export async function createUser(req: Request, res: Response) {
    const { name } = req.body;
    const newUser = await UserService.createUser({ name });

    res.status(201).json(newUser);
}

export async function getUsers(_: Request, res: Response) {
    const users = await UserService.getUsers();
    res.json({ users });
}

export async function getUserById(req: Request, res: Response) {
    const user = await UserService.getUserById(req.params.id);
    res.json(user ?? null);
}
