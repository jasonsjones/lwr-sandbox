import { LightningElement } from 'lwc';
import { createRouter } from 'lwr/router';
import { routes } from './routes';

export default class OrionLabsApp extends LightningElement {
    router = createRouter({ routes });
}
