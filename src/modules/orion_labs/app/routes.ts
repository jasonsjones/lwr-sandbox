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
        id: 'namedPage',
        uri: '/:pageName',
        handler: (): Promise<RouteHandlerModule> => import('orion_labs/namedPageHandler'),
        page: {
            type: 'namedPage',
            attributes: {
                pageName: ':pageName'
            }
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
