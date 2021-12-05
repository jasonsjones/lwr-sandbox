import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lwr/navigation';

export default class UserDetails extends LightningElement {
    userId: string;

    @wire(CurrentPageReference)
    pageReference(pageRef: any) {
        this.userId = pageRef ? pageRef.attributes.userId : '';
    }
}
