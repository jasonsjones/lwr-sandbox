export interface User {
    id: string;
    name: string;
    sfdcUserId?: string;
}

export type CreateUserDTO = Omit<User, "id">;

