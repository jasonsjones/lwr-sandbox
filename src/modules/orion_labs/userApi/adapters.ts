import { Adapter } from '@luvio/engine';
import { luvio } from 'orion/adapters';
import { createWireAdapterConstructor } from '@luvio/lwc-luvio';
import { getUsersAdapterFactory } from '../../../generated/adapters/getUsers';
import { getUserAdapterFactory } from '../../../generated/adapters/getUser';
import { createUserAdapterFactory } from '../../../generated/adapters/createUser';

const getUsersLuvioAdapter = getUsersAdapterFactory(luvio);
const getUserLuvioAdapter = getUserAdapterFactory(luvio);

const GetUsersWireAdapter = createWireAdapterConstructor(
    getUsersLuvioAdapter as Adapter<unknown, unknown>, // not sure how to fix type mis-match
    'getUsers',
    luvio
);

const GetUserWireAdapter = createWireAdapterConstructor(
    getUserLuvioAdapter as Adapter<unknown, unknown>,
    'getUser',
    luvio
);

const createUser = createUserAdapterFactory(luvio);

export { GetUsersWireAdapter as getUsers, GetUserWireAdapter as getUser, createUser };
