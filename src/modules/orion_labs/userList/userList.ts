import { LightningElement, track, wire } from 'lwc';
import { createUser, getUsers, User } from 'orion_labs/userApi';

export default class UserList extends LightningElement {
    @track _users: User[];

    @wire(getUsers)
    getAllUsers({ data, error }: { data: { users: User[] }; error: Error }): void {
        if (error) {
            console.log(error.message);
            return;
        }

        if (data && Array.isArray(data.users)) {
            this._users = data.users;
        }
    }

    get users(): User[] {
        return this._users || [];
    }

    async handleAddUser(event: CustomEvent): Promise<void> {
        event.stopPropagation();
        const { name } = event.detail;
        if (name) {
            const response = await createUser({ name });
            if (response) {
                const newUser = response.data as User;
                this._users = [...this._users, newUser];
            }
        }
    }
}
