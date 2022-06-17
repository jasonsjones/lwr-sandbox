import { Environment, FetchResponse, Luvio, ResourceRequest, Store } from '@luvio/engine';

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

export { networkAdapter, luvio };
