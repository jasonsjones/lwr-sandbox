export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    sfdcUserId?: string;
}

export type CreateUserDTO = Omit<User, 'id'>;
