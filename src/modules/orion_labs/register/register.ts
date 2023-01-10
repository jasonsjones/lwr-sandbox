import { LightningElement, track, wire } from 'lwc';
import { navigate, NavigationContext } from 'lwr/navigation';
import { createUser } from 'orion_labs/userApi';
import type { ContextId } from 'lwr/navigation';

export default class Register extends LightningElement {
    @track error: string;

    @wire(NavigationContext)
    navContext?: ContextId;

    async handleSubmit(event: CustomEvent) {
        event.preventDefault();
        if (this.validateForm()) {
            // make POST to register user
            const response = await createUser({
                firstName: this.formValues.firstName,
                lastName: this.formValues.lastName,
                email: this.formValues.email,
                password: this.formValues.password
            });

            if (response) {
                this.clearForm();
                navigate(this.navContext, {
                    type: 'home'
                });
            }
        }
    }

    get formValues() {
        const firstName = this.getFieldValue('firstName') || '';
        const lastName = this.getFieldValue('lastName') || '';
        const email = this.getFieldValue('email') || '';
        const password = this.getFieldValue('password') || '';

        const confirmPassword = this.getFieldValue('confirmPassword');

        return {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        };
    }

    get hasError() {
        return this.error && this.error.length > 0;
    }

    validateForm() {
        if (this.error) this.error = '';
        if (this.formValues.password !== this.formValues.confirmPassword) {
            this.error = 'Passwords do not match';
            return false;
        }
        return true;
    }

    getField(fieldName: string) {
        const inputEl = this.template.querySelector(
            `orion-input[data-id='${fieldName}']`
        ) as HTMLInputElement;

        return inputEl;
    }

    getFieldValue(fieldName: string) {
        const inputEl = this.getField(fieldName);

        if (inputEl) {
            return inputEl.value;
        }
    }

    clearForm() {
        this.getField('firstName').value = '';
        this.getField('lastName').value = '';
        this.getField('email').value = '';
        this.getField('password').value = '';
        this.getField('confirmPassword').value = '';
        this.error = '';
    }
}
