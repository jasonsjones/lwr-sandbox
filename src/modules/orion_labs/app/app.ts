import { LightningElement } from 'lwc';
import { createRouter } from 'lwr/router';
import type { RouteDefinition, RouteHandlerModule } from 'lwr/router';

const routes: RouteDefinition[] = [
    {
        id: 'home',
        uri: '/',
        handler: (): Promise<RouteHandlerModule> => import('orion_labs/homePageHandler'),
        page: {
            type: 'home'
        }
    }
];

export default class OrionLabsApp extends LightningElement {
    router = createRouter({ routes });
}
