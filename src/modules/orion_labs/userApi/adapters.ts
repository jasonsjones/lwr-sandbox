import { Adapter, Environment, FetchResponse, Luvio, ResourceRequest, Store } from '@luvio/engine';
import { createWireAdapterConstructor } from '@luvio/lwc-luvio';
import { getUsersAdapterFactory } from './generated/adapters/getUsers';
import { getUserAdapterFactory } from './generated/adapters/getUser';
import { createUserAdapterFactory } from './generated/adapters/createUser';

const store = new Store();

async function networkAdapter(resourceRequest: ResourceRequest): Promise<FetchResponse<any>> {
    const { baseUri, basePath, body, method } = resourceRequest;
    const path = `${baseUri}${basePath}`;

    const response = await fetch(path, {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json'
        },
        body: body === null ? null : JSON.stringify(body)
    });

    const resBody = await response.json();

    return {
        body: resBody,
        status: response.status,
        statusText: 'ok',
        ok: response.status === 200 || response.status === 201,
        headers: {}
    };
}

const luvio = new Luvio(new Environment(store, networkAdapter));
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
