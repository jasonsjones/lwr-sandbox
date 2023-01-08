import bcrypt from 'bcryptjs';
import prisma from '../db/client';
import { User, Prisma } from '@prisma/client';

export async function createUser(userData: Prisma.UserCreateInput): Promise<User> {
    const { password } = userData;
    if (password) {
        return createUserWithPassword(userData);
    }
    return createUserWithoutPassword(userData);
}

export async function getUsers(): Promise<User[]> {
    return await prisma.user.findMany();
}

export async function getUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
}

export async function getUserBySfdcId(id: string): Promise<User | null> {
    return await prisma.user.findFirst({ where: { sfdcUserId: id } });
}

async function createUserWithPassword(userData: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password as string, 12);

    const user = await prisma.user.create({
        data: {
            ...userData,
            password: {
                create: {
                    hash: hashedPassword
                }
            }
        }
    });
    return user;
}

async function createUserWithoutPassword(userData: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
        data: userData
    });
    return user;
}
