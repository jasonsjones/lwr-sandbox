import { createElement } from 'lwc';
import About from 'orion_labs/about';

describe('About component', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('matches snapshot', () => {
        const element: HTMLElement = createElement('orion_labs-about', {
            is: About
        });
        document.body.appendChild(element);

        expect(element).toMatchSnapshot();
    });
});
