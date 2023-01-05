import { LightningElement } from 'lwc';

export default class Register extends LightningElement {
    async handleSubmit(event: CustomEvent) {
        event.preventDefault();
        console.log('handling submit...');
    }
}
