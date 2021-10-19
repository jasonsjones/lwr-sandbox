import { LightningElement, wire } from 'lwc';
import { NavigationContext, generateUrl, navigate } from 'lwr/navigation';
import type { ContextId } from 'lwr/navigation';

export default class NavBar extends LightningElement {
    @wire(NavigationContext)
    navContext?: ContextId;
    homeUrl?: string;
    aboutUrl?: string;

    handleClick(event: Event): void {
        event.preventDefault();
        if (this.navContext) {
            navigate(this.navContext, {
                type: 'home'
            });
        }
    }

    handleAboutClick(event: Event): void {
        event.preventDefault();
        if (this.navContext) {
            navigate(this.navContext, {
                type: 'about'
            });
        }
    }

    connectedCallback(): void {
        if (this.navContext) {
            this.homeUrl = generateUrl(this.navContext, { type: 'home' }) || undefined;
            this.aboutUrl = generateUrl(this.navContext, { type: 'about' }) || undefined;
        }
    }
}
