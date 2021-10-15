import { LightningElement, track, wire } from 'lwc';
import { createUser, getUsers, User } from 'orion_labs/userApi';

export default class UserList extends LightningElement {
    @track _users: User[];

    @wire(getUsers)
    getAllUsers(data: User[]): void {
        if (data && Array.isArray(data)) {
            this._users = data;
        }
    }

    get users(): User[] {
        return this._users;
    }

    handleSubmit(event: Event): void {
        event.preventDefault();
        const input = this.template.querySelector('input');
        if (input) {
            const newName = input.value;
            createUser(newName as string);
            input.value = '';
        }
    }
}
