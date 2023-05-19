import { createWireAdapterConstructor } from '@luvio/lwc-luvio';
import { getContextUserAdapterFactory } from './generated/adapters/getContextUser';
import { loginAdapterFactory } from './generated/adapters/login';
import { logoutAdapterFactory } from './generated/adapters/logout';
import { luvio } from './network';

const getContextUserLuvioAdapter = getContextUserAdapterFactory(luvio);

const GetContextUserWireAdapter = createWireAdapterConstructor(
    getContextUserLuvioAdapter,
    'getContextUser',
    luvio
);

const login = loginAdapterFactory(luvio);
const logout = logoutAdapterFactory(luvio);

export { GetContextUserWireAdapter as getContextUser, login, logout };
