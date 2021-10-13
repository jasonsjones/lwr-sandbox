import type { RouteHandlerCallback, Module } from 'lwr/router';

export default class HomePageHandler {
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
                default: (): Promise<Module> => import('orion_labs/home')
            }
        });
    }
}
