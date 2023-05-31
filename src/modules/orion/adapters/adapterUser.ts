import { createWireAdapterConstructor } from '@luvio/lwc-luvio';
import { createUserAdapterFactory } from './generated/adapters/createUser';
import { getUserAdapterFactory } from './generated/adapters/getUser';
import { getUsersAdapterFactory } from './generated/adapters/getUsers';
import { luvio } from './network';

const getUsersLuvioAdapter = getUsersAdapterFactory(luvio);
const getUserLuvioAdapter = getUserAdapterFactory(luvio);

// @ts-ignore
const GetUsersWireAdapter = createWireAdapterConstructor(getUsersLuvioAdapter, 'getUsers', luvio);

// @ts-ignore
const GetUserWireAdapter = createWireAdapterConstructor(getUserLuvioAdapter, 'getUser', luvio);

const createUser = createUserAdapterFactory(luvio);

export { GetUsersWireAdapter as getUsers, GetUserWireAdapter as getUser, createUser };
