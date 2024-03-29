import { Environment, FetchResponse, InMemoryStore, Luvio, ResourceRequest } from '@luvio/engine';

const store = new InMemoryStore();

async function networkAdapter(resourceRequest: ResourceRequest): Promise<FetchResponse<any>> {
    const { baseUri, basePath, body, method } = resourceRequest;
    const path = `${baseUri}${basePath}`;

    const response = await fetch(path, {
        method: method.toUpperCase(),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body === null ? null : JSON.stringify(body)
    });

    const resBody = await response.json();

    return {
        body: resBody,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: {}
    };
}

const luvio = new Luvio(new Environment(store, networkAdapter));

export { networkAdapter, luvio };
