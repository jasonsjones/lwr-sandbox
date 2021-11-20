import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference, NavigationContext, generateUrl, navigate } from 'lwr/navigation';
import type { ContextId, PageReference } from 'lwr/navigation';

export default class NavLink extends LightningElement {
    url?: string;
    @track _isActiveLink: boolean;

    @wire(NavigationContext)
    navContext?: ContextId;

    _currentPageRef: PageReference;
    @wire(CurrentPageReference)
    printPageType(pageRef: PageReference): void {
        this._currentPageRef = pageRef;
        this._isActiveLink = this.navigateTo.type === pageRef.type;
    }

    @api
    navigateTo: PageReference;

    handleClick(event: Event): void {
        event.preventDefault();
        if (this.navContext) {
            navigate(this.navContext, this.navigateTo);
        }
    }

    get computeClass(): string {
        return `text-xl py-2 hover:text-white md:text-2xl ${
            this._isActiveLink ? 'border-b-2' : ''
        }`;
    }

    connectedCallback(): void {
        if (this.navContext) {
            this.url = generateUrl(this.navContext, this.navigateTo) || undefined;
        }
    }
}
