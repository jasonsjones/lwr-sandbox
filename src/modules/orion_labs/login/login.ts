import { LightningElement, track, wire } from 'lwc';
import { NavigationContext, navigate } from 'lwr/navigation';
import type { ContextId } from 'lwr/navigation';
import { login } from 'orion_labs/authApi';

export default class Login extends LightningElement {
    @track error: string;

    info = 'Email/Password login is a beta feature.';

    @wire(NavigationContext)
    navContext?: ContextId;

    async handleLogin(event: CustomEvent) {
        event.preventDefault();
        const email = this.emailInput?.value;
        const password = this.passwordInput?.value;
        const response = await login({ email, password });
        if (response?.data?.success) {
            this.navigationToHome();
            this.error = '';
        } else {
            this.error = 'Login credentials invalid. Please try again.';
            this.emailInput.focus();
        }
    }

    handleCancel(event: CustomEvent) {
        event.preventDefault();
        this.navigationToHome();
    }

    get hasError() {
        return this.error?.length > 0;
    }

    get emailInput() {
        return this.template.querySelector('orion-input[type="email"]') as HTMLInputElement;
    }

    get passwordInput() {
        return this.template.querySelector('orion-input[type="password"]') as HTMLInputElement;
    }

    navigationToHome() {
        if (this.navContext) {
            navigate(this.navContext, { type: 'home' });
        }
    }
}
