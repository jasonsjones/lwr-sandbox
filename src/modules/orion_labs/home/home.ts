import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lwr/navigation';
import type { PageReference } from 'lwr/navigation';
import { getContextUser } from 'orion_labs/authApi';
import { registerListener, unregisterListener } from 'orion/eventEmitter';
import { User } from 'orion_labs/userApi';

export default class Home extends LightningElement {
    @track user: User | null;

    @wire(CurrentPageReference)
    pageRef: PageReference;

    @wire(getContextUser)
    ctxUser(response: any): void {
        const { data } = response;
        if (data?.isAuthenticated && data?.user) {
            this.user = data.user;
        }
    }

    connectedCallback(): void {
        registerListener('logout', this.handleLogoutEvent, this);
    }

    disconnectedCallback(): void {
        unregisterListener('logout', this.handleLogoutEvent, this);
    }

    handleLogoutEvent(data: any) {
        this.user = null;
    }
}
