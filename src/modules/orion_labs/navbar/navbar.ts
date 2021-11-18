import { LightningElement, wire } from 'lwc';
import { NavigationContext, generateUrl, navigate } from 'lwr/navigation';
import type { ContextId, PageReference } from 'lwr/navigation';

export default class NavBar extends LightningElement {
    @wire(NavigationContext)
    navContext?: ContextId;
    homeUrl?: string;
    _isAuthenticated = false;

    handleClick(event: Event): void {
        event.preventDefault();
        if (this.navContext) {
            navigate(this.navContext, {
                type: 'home'
            });
        }
    }

    get isAuthenticated() {
        return this._isAuthenticated;
    }

    get aboutPage(): PageReference {
        return {
            type: 'about'
        };
    }

    get userListPage(): PageReference {
        return {
            type: 'users'
        };
    }

    async handleLogout() {
        const response = await fetch('/api/v1/auth/logout');
        await response.json();
        this._isAuthenticated = false;
    }

    async connectedCallback(): Promise<void> {
        if (this.navContext) {
            this.homeUrl = generateUrl(this.navContext, { type: 'home' }) || undefined;
        }

        const response = await fetch('/api/v1/auth/user');
        const data = await response.json();
        if (data.isAuthenticated) {
            this._isAuthenticated = true;
        }
    }
}
