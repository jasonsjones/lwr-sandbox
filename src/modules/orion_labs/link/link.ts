import { api, LightningElement, wire } from 'lwc';
import { NavigationContext, generateUrl, navigate } from 'lwr/navigation';
import type { ContextId, PageReference } from 'lwr/navigation';

enum PageType {
    EXTERNAL = 'external_webpage'
}

enum Target {
    BLANK = '_blank',
    SELF = '_self'
}

export default class Link extends LightningElement {
    url?: string;

    @wire(NavigationContext)
    navContext?: ContextId;

    @api
    navigateTo: PageReference;

    @api
    openInNewTab: boolean;

    @api
    relationship: string;

    handleClick(event: Event): void {
        event.preventDefault();
        if (this.navigateTo.type === PageType.EXTERNAL) {
            const target = this.openInNewTab ? Target.BLANK : Target.SELF;
            window.open(this.navigateTo.attributes.url, target)?.focus();
            return;
        }

        if (this.navContext) {
            navigate(this.navContext, this.navigateTo);
        }
    }

    computerUrl(): void {
        if (this.navigateTo.type === PageType.EXTERNAL) {
            this.url = this.navigateTo.attributes.url;
        } else if (this.navContext) {
            this.url = generateUrl(this.navContext, this.navigateTo) || undefined;
        }
    }

    connectedCallback(): void {
        this.computerUrl();
    }
}
