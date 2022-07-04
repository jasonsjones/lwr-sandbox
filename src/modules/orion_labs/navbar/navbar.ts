import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lwr/navigation';
import type { ContextId, PageReference } from 'lwr/navigation';
import { fireEvent } from 'orion/eventEmitter';
import { getContextUser, logout } from 'orion_labs/authApi';
import { ContextUserResponse } from 'src/generated/types/ContextUserResponse';

export default class NavBar extends LightningElement {
    navContext?: ContextId;
    homeUrl?: string;
    _isAuthenticated = false;
    isMobileMenuOpen = false;

    @wire(CurrentPageReference)
    pageRef: PageReference;

    @wire(getContextUser)
    ctxUser({ data }: { data: ContextUserResponse; error: Error }): void {
        if (data?.isAuthenticated) {
            this._isAuthenticated = true;
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

    get userListPage(): PageReference {
        return this.getPageReferenceFor('users');
    }

    toggleMobileMenu(): void {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    async handleLogout() {
        const response = await logout({});
        if (response?.data?.success) {
            fireEvent(this.pageRef, 'logout', { message: 'user logout' });
            this._isAuthenticated = false;
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
