import { v4 } from 'uuid';
import { User } from './userApi';

class UserService {
    users = new Map<string, User>();

    getAll(): User[] {
        return Array.from(this.users.values());
    }

    getById(id: string): User | undefined {
        return this.users.get(id);
    }

    create(name: string): void {
        const newUser: User = {
            id: v4(),
            name: name
        };
        this.users.set(newUser.id, newUser);
    }
}

export const userService = new UserService();

userService.create('Oliver Queen');
userService.create('Barry Allen');
