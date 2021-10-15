import { WireAdapter, WireConfigValue, WireDataCallback } from 'lwc';
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

    update(): void {
        this._refresh();
    }

    _refresh(): void {
        const allUsers = userService.getAll();
        this.dataCallback(allUsers);
    }
}

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
            const user = userService.getById(id);
            if (user) {
                this.dataCallback(user);
            } else {
                this.dataCallback(null);
            }
        }
    }
}

export function createUser(name: string): void {
    userService.create(name);
    refreshGetUsersInstances();
}
