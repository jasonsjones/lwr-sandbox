import { createElement } from 'lwc';
import App from 'orion_labs/app';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => jest.fn()
    })
) as jest.Mock;

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

    it('includes a router container', () => {
        const rc = element.shadowRoot?.querySelector('lwr-router-container');
        expect(rc).toBeTruthy();
    });

    it('includes a router outlet', () => {
        const outlet = element.shadowRoot?.querySelector('lwr-outlet');
        expect(outlet).toBeTruthy();
    });
});
