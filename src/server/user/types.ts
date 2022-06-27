export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    sfdcUserId?: string;
}

export type CreateUserDTO = Omit<User, 'id'>;
