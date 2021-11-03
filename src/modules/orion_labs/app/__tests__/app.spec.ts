import { createElement } from 'lwc';
import App from 'orion_labs/app';

describe('App component', () => {
    let element: HTMLElement;

    beforeEach(() => {
        element = createElement('orion_labs-app', {
            is: App
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders a router container', () => {
        const rc = element.shadowRoot?.querySelector('lwr-router-container');

        expect(rc).toBeTruthy();
    });
});
