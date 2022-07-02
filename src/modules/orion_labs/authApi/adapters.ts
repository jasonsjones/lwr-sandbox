import { Adapter } from '@luvio/engine';
import { luvio } from 'orion/adapters';
import { createWireAdapterConstructor } from '@luvio/lwc-luvio';
import { loginAdapterFactory } from '../../../generated/adapters/login';
import { getContextUserAdapterFactory } from '../../../generated/adapters/getContextUser';

const getContextUserLuvioAdapter = getContextUserAdapterFactory(luvio);

const GetContextUserWireAdapter = createWireAdapterConstructor(
    getContextUserLuvioAdapter as Adapter<unknown, unknown>, // not sure how to fix type mis-match
    'getContextUser',
    luvio
);
const login = loginAdapterFactory(luvio);

export { GetContextUserWireAdapter as getContextUser, login };
