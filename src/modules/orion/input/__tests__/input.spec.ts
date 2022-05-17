// @ts-expect-error get createElement from lwc for tests
import { createElement } from 'lwc';
import Element from '../input';

function createInput(params = {}) {
    const element = createElement('orion-input', { is: Element });
    Object.assign(element, params);
    document.body.appendChild(element);
    return element;
}
describe('orion-input', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders an input and label', () => {
        const element = createInput({ label: 'Test Input', inputId: 'test' });
        expect(element).toMatchSnapshot();
    });

    it('exposes value from html input', () => {
        const expectedText = 'orion labs';

        const element = createInput();
        const baseInput = element.shadowRoot.querySelector('input');
        baseInput.value = expectedText;
        baseInput.dispatchEvent(new CustomEvent('input', { composed: true, bubbles: true }));
        expect(element.value).toBe(expectedText);
    });
});
