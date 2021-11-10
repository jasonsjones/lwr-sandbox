import { Adapter, Environment, FetchResponse, Luvio, ResourceRequest, Store } from '@luvio/engine';
import { createWireAdapterConstructor } from '@luvio/lwc-luvio';
import { getUsersAdapterFactory } from './generated/adapters/getUsers';

const store = new Store();

async function networkAdapter(resourceRequest: ResourceRequest): Promise<FetchResponse<any>> {
    const { baseUri, basePath, method } = resourceRequest;
    const path = `${baseUri}${basePath}`;

    const response = await fetch(path, {
        method: method.toUpperCase()
    });

    const resBody = await response.json();

    return {
        body: resBody,
        status: response.status,
        statusText: 'ok',
        ok: response.status === 200,
        headers: {}
    };
}

const luvio = new Luvio(new Environment(store, networkAdapter));
const getUsersLuvioAdapter = getUsersAdapterFactory(luvio);

const GetUsersWireAdapter = createWireAdapterConstructor(
    getUsersLuvioAdapter as Adapter<unknown, unknown>, // not sure how to fix type mis-match
    'getUsers',
    luvio
);

async function createUser(name: string): Promise<void> {
    console.log(
        await Promise.resolve(`Create user implementation not yet implemented for user ${name}`)
    );
}

export { GetUsersWireAdapter as getUsers, createUser };
