import { LightningElement } from 'lwc';
import type { ContextId, PageReference } from 'lwr/navigation';
import { fetchAuthUser, logout } from 'orion_labs/authService';

export default class NavBar extends LightningElement {
    navContext?: ContextId;
    homeUrl?: string;
    _isAuthenticated = false;
    isMobileMenuOpen = false;

    get isAuthenticated() {
        return this._isAuthenticated;
    }

    get aboutPage(): PageReference {
        return {
            type: 'about'
        };
    }

    get homePage(): PageReference {
        return {
            type: 'home'
        };
    }

    get loginPage(): PageReference {
        return {
            type: 'login'
        };
    }

    get userListPage(): PageReference {
        return {
            type: 'users'
        };
    }

    toggleMobileMenu(): void {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    async handleLogout() {
        await logout();
        this._isAuthenticated = false;
    }

    async connectedCallback(): Promise<void> {
        const data = await fetchAuthUser();
        if (data.isAuthenticated) {
            this._isAuthenticated = true;
        }
    }
}
