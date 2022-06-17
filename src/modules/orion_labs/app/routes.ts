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
        id: 'login',
        uri: '/login',
        handler: (): Promise<RouteHandlerModule> => import('orion_labs/namedPageHandler'),
        page: {
            type: 'login'
        }
    },
    {
        id: 'users',
        uri: '/users',
        handler: (): Promise<RouteHandlerModule> => import('orion_labs/userListPageHandler'),
        page: {
            type: 'users'
        }
    },
    {
        id: 'user-detail',
        uri: '/users/:userId',
        page: {
            type: 'user_detail',
            attributes: {
                userId: ':userId'
            }
        },
        handler: (): Promise<RouteHandlerModule> => import('orion_labs/userDetailsPageHandler')
    }
];
