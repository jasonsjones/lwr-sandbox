import { LightningElement, track, wire } from 'lwc';
import { NavigationContext, navigate } from 'lwr/navigation';
import { createUser, getUsers, User } from 'orion_labs/userApi';
import type { ContextId } from 'lwr/navigation';
export default class UserList extends LightningElement {
    @track _users: User[];

    @wire(NavigationContext)
    navContext?: ContextId;

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
        return (this._users || []).map((user) => {
            return {
                ...user,
                pageRef: {
                    type: 'user_detail',
                    attributes: {
                        userId: user.id
                    }
                }
            };
        });
    }

    handleUserClick(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        const target = event.currentTarget as HTMLElement;
        navigate(this.navContext, {
            type: 'user_detail',
            attributes: {
                userId: target.dataset.id
            }
        });
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
