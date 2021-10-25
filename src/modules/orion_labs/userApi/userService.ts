import { User } from './userApi';

class UserService {
    async create(name: string): Promise<void> {
        await fetch('/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
    }

    async getAll(): Promise<User[]> {
        const response = await fetch('/api/v1/users');
        const data = await response.json();
        if (data.success) {
            return data.payload?.users;
        }

        return Promise.resolve([]);
    }
}

export const userService = new UserService();
