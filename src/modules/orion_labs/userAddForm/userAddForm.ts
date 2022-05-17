import { LightningElement } from 'lwc';

export default class UserAddForm extends LightningElement {
    handleSubmit(event: Event): void {
        event.preventDefault();
        const input = this.inputEl;
        if (input) {
            const newName = input.value;
            if (newName?.length > 0) {
                this.dispatchEvent(
                    new CustomEvent('adduser', {
                        composed: true,
                        bubbles: true,
                        detail: {
                            name: newName
                        }
                    })
                );
            }

            input.value = '';
        }
    }

    get inputEl() {
        return this.template.querySelector('orion-input') as HTMLInputElement;
    }
}
