import { LightningElement, wire } from 'lwc';
import { NavigationContext, generateUrl, navigate } from 'lwr/navigation';
import type { ContextId, PageReference } from 'lwr/navigation';

export default class NavBar extends LightningElement {
    @wire(NavigationContext)
    navContext?: ContextId;
    homeUrl?: string;

    handleClick(event: Event): void {
        event.preventDefault();
        if (this.navContext) {
            navigate(this.navContext, {
                type: 'home'
            });
        }
    }

    get aboutPage(): PageReference {
        return {
            type: 'about'
        };
    }

    connectedCallback(): void {
        if (this.navContext) {
            this.homeUrl = generateUrl(this.navContext, { type: 'home' }) || undefined;
        }
    }
}
