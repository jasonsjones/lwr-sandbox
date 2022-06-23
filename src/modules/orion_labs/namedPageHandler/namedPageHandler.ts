import { RouteInstance, RouteHandler, RouteHandlerCallback } from 'lwr/router';

export default class NamedPageHander implements RouteHandler {
    callback: RouteHandlerCallback;
    constructor(cb: RouteHandlerCallback) {
        this.callback = cb;
    }

    dispose(): void {
        /* noop */
    }

    update({ attributes }: RouteInstance): void {
        let viewGetter;
        switch (attributes.pageName) {
            case 'about':
                viewGetter = () => import('orion_labs/about');
                break;
            case 'login':
                viewGetter = () => import('orion_labs/login');
                break;
            case 'users':
                viewGetter = () => import('orion_labs/userList');
                break;
            default:
                return;
        }
        this.callback({
            viewset: {
                default: viewGetter
            }
        });
    }
}
