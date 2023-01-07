export { getUsers, getUser, createUser } from 'orion/adapters';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}
