import { LightningElement, wire } from 'lwc';
import { NavigationContext, navigate } from 'lwr/navigation';
import type { ContextId } from 'lwr/navigation';

export default class Login extends LightningElement {
    error = 'Email/Password login not yet implemented.';

    @wire(NavigationContext)
    navContext?: ContextId;

    handleLogin(event: CustomEvent) {
        event.preventDefault();
        console.log('Login not yet implemented...');
    }

    handleCancel(event: CustomEvent) {
        event.preventDefault();
        if (this.navContext) {
            navigate(this.navContext, { type: 'home' });
        }
    }
}
