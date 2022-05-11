import { createServer } from 'lwr';
import configureApp from './app';

let PORT;
if (process.env.PORT) {
    PORT = parseInt(process.env.PORT, 10) || 4200;
}

const lwrServer = createServer({ serverType: 'express', port: PORT });

const app = lwrServer.getInternalServer<'express'>();

configureApp(app);

export { lwrServer };
