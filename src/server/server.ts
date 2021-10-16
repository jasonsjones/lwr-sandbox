import { createServer } from 'lwr';
import configureApp from './app';

const lwrServer = createServer({ serverType: 'express' });

const app = lwrServer.getInternalServer<'express'>();

configureApp(app);

export { lwrServer };
