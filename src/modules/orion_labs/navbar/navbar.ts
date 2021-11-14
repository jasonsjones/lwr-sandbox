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

    handleSFDCAuth() {
        window.localStorage.setItem('isAuthenticated', 'true');
    }

    handleLogout() {
        window.localStorage.removeItem('isAuthenticated');
        this._isAuthenticated = false;
    }

    connectedCallback(): void {
        if (this.navContext) {
            this.homeUrl = generateUrl(this.navContext, { type: 'home' }) || undefined;
        }
        this._isAuthenticated = !!window.localStorage.getItem('isAuthenticated');
    }
}
