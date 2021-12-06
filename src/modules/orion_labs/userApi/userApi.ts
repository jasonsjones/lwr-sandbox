export { getUsers, getUser, createUser } from './adapters';

export interface User {
    id: string;
    name: string;
}
