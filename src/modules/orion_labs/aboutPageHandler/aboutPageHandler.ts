import { Module, RouteHandler, RouteHandlerCallback } from 'lwr/router';

export default class AboutPageHander implements RouteHandler {
    callback: RouteHandlerCallback;
    constructor(cb: RouteHandlerCallback) {
        this.callback = cb;
    }

    dispose(): void {
        /* noop */
    }

    update(): void {
        this.callback({
            viewset: {
                default: (): Promise<Module> => import('orion_labs/about')
            }
        });
    }
}
