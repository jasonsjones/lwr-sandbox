import dotenv from 'dotenv';
import { v4 } from 'uuid';
import { User } from './types';

dotenv.config();

const password = '123456';

export const users: User[] = [
    {
        id: v4(),
        name: 'Ed Baldwin',
        email: 'ed@nasa.gov',
        password: process.env.DEFAULT_PASSWORD || password
    },
    {
        id: v4(),
        name: 'James Gordon',
        email: 'james@gotham.gov',
        password: process.env.DEFAULT_PASSWORD || password
    },
    {
        id: v4(),
        name: 'Joe West',
        email: 'joe@centralcity.gov',
        password: process.env.DEFAULT_PASSWORD || password
    },
    {
        id: v4(),
        name: 'William Riker',
        email: 'xo@ncc1701d.mil',
        password: process.env.DEFAULT_PASSWORD || password
    }
];
