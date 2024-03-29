import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lwr/navigation';
import type { ContextId, PageReference } from 'lwr/navigation';
import { fireEvent } from 'orion/eventEmitter';
import { getContextUser, logout } from 'orion_labs/authApi';
import { User } from 'orion_labs/userApi';

export default class NavBar extends LightningElement {
    @track _user: User | null;
    navContext?: ContextId;
    homeUrl?: string;
    _isAuthenticated = false;
    isMobileMenuOpen = false;

    @wire(CurrentPageReference)
    pageRef: PageReference;

    @wire(getContextUser)
    ctxUser({ data }: { data: any; error: Error }): void {
        this._isAuthenticated = false;

        if (data?.isAuthenticated) {
            this._isAuthenticated = true;
            this._user = data.user;
        }
    }

    get isAuthenticated() {
        return this._isAuthenticated;
    }

    get homePage(): PageReference {
        return {
            type: 'home'
        };
    }

    get aboutPage(): PageReference {
        return this.getPageReferenceFor('about');
    }

    get loginPage(): PageReference {
        return this.getPageReferenceFor('login');
    }

    get registerPage(): PageReference {
        return this.getPageReferenceFor('register');
    }

    get userListPage(): PageReference {
        return this.getPageReferenceFor('users');
    }

    get user(): User | null {
        return this._user;
    }

    get displayName(): string {
        if (this._user) {
            return `${this._user.firstName} ${this._user.lastName}`;
        }
        return '';
    }

    toggleMobileMenu(): void {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        const nav = this.template.querySelector('nav[data-id="mobile-menu"]');
        if (this.isMobileMenuOpen) {
            nav?.classList.remove('animate-slide-out-right');
            nav?.classList.add('animate-slide-in-left');
        } else {
            nav?.classList.remove('animate-slide-in-left');
            nav?.classList.add('animate-slide-out-right');
        }
    }

    async handleLogout() {
        const response = await logout({});
        if (response?.data?.success) {
            fireEvent(this.pageRef, 'logout', { message: 'user logout' });
            this._isAuthenticated = false;
            this._user = null;
        }
    }

    getPageReferenceFor(pageName: string): PageReference {
        return {
            type: 'namedPage',
            attributes: {
                pageName
            }
        };
    }
}
