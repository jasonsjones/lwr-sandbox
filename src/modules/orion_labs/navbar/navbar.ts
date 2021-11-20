import { LightningElement, wire } from 'lwc';
import { NavigationContext, generateUrl, navigate } from 'lwr/navigation';
import type { ContextId, PageReference } from 'lwr/navigation';
import { fetchAuthUser, logout } from 'orion_labs/authService';

export default class NavBar extends LightningElement {
    @wire(NavigationContext)
    navContext?: ContextId;
    homeUrl?: string;
    _isAuthenticated = false;
    isMobileMenuOpen = false;

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

    toggleMobileMenu(): void {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    async handleLogout() {
        await logout();
        this._isAuthenticated = false;
    }

    async connectedCallback(): Promise<void> {
        if (this.navContext) {
            this.homeUrl = generateUrl(this.navContext, { type: 'home' }) || undefined;
        }

        const data = await fetchAuthUser();
        if (data.isAuthenticated) {
            this._isAuthenticated = true;
        }
    }
}
