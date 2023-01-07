import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lwr/navigation';
import { getUser, User } from 'orion_labs/userApi';

export default class UserDetails extends LightningElement {
    _userId: string;
    @track user: User;

    @wire(CurrentPageReference)
    pageReference(pageRef: any) {
        this._userId = pageRef ? pageRef.attributes.userId : '';
    }

    @wire(getUser, { id: '$_userId' })
    fetchUser({ data, error }: { data: User; error: Error }): void {
        if (error) {
            console.log(error.message);
            return;
        }

        if (data) {
            this.user = data;
        }
    }

    get userId(): string {
        return this.user ? this.user.id : 'Unknown user id';
    }

    get name(): string {
        return this.user ? `${this.user.firstName} ${this.user.lastName}` : 'User Unknown';
    }
}
