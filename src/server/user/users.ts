import dotenv from 'dotenv';
import { v4 } from 'uuid';
import { User } from './types';

dotenv.config();

const password = '123456';

export const users: User[] = [
    {
        id: v4(),
        firstName: 'Ed',
        lastName: 'Baldwin',
        email: 'ed@nasa.gov',
        password: process.env.DEFAULT_PASSWORD || password
    },
    {
        id: v4(),
        firstName: 'James',
        lastName: 'Gordon',
        email: 'james@gotham.gov',
        password: process.env.DEFAULT_PASSWORD || password
    },
    {
        id: v4(),
        firstName: 'Joe',
        lastName: 'West',
        email: 'joe@centralcity.gov',
        password: process.env.DEFAULT_PASSWORD || password
    },
    {
        id: v4(),
        firstName: 'William',
        lastName: 'Riker',
        email: 'xo@ncc1701d.mil',
        password: process.env.DEFAULT_PASSWORD || password
    }
];
