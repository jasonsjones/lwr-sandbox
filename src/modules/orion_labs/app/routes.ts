import type { RouteDefinition, RouteHandlerModule } from 'lwr/router';

export const routes: RouteDefinition[] = [
    {
        id: 'home',
        uri: '/',
        handler: (): Promise<RouteHandlerModule> => import('orion_labs/homePageHandler'),
        page: {
            type: 'home'
        }
    },
    {
        id: 'about',
        uri: '/about',
        handler: (): Promise<RouteHandlerModule> => import('orion_labs/aboutPageHandler'),
        page: {
            type: 'about'
        }
    },
    {
        id: 'users',
        uri: '/users',
        handler: (): Promise<RouteHandlerModule> => import('orion_labs/userListPageHandler'),
        page: {
            type: 'users'
        }
    }
];
