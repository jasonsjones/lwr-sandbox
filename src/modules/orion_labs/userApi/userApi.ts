import { WireAdapter, WireDataCallback } from 'lwc';
import { userService } from './userService';

export interface User {
    id: string;
    name: string;
}

const getUsersInstances = new Set<getUsers>();

function refreshGetUsersInstances(): void {
    getUsersInstances.forEach((instance) => instance._refresh());
}

export class getUsers implements WireAdapter {
    dataCallback: WireDataCallback;

    constructor(dataCallback: WireDataCallback) {
        this.dataCallback = dataCallback;
        this.dataCallback(undefined);
    }

    connect(): void {
        getUsersInstances.add(this);
    }

    disconnect(): void {
        getUsersInstances.delete(this);
    }

    async update(): Promise<void> {
        await this._refresh();
    }

    async _refresh(): Promise<void> {
        const allUsers = await userService.getAll();
        this.dataCallback(allUsers);
    }
}

/*
export class getUser implements WireAdapter {
    dataCallback: WireDataCallback;
    connected = false;
    userId: string | undefined;

    constructor(dataCallback: WireDataCallback) {
        this.dataCallback = dataCallback;
    }

    update(config: WireConfigValue): void {
        if (this.userId !== config.id) {
            this.userId = config.id;
            this.getUserById(this.userId as string);
        }
    }

    connect(): void {
        this.connected = true;
    }

    disconnect(): void {
        this.connected = false;
    }

    getUserById(id: string): void {
        if (this.connected && this.userId !== undefined) {
            const stubUser = {
                id,
                name: 'Stub User'
            };

            if (stubUser) {
                this.dataCallback(stubUser);
            } else {
                this.dataCallback(null);
            }
        }
    }
}
*/

export async function createUser(name: string): Promise<void> {
    await userService.create(name);
    refreshGetUsersInstances();
}
