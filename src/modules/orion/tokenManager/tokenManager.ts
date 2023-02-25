class AccessTokenManager {
    private accessToken: string | null;

    constructor() {
        this.accessToken = null;
    }

    public setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    public getAccessToken(): string | null {
        return this.accessToken;
    }

    public clearAccessToken() {
        this.accessToken = null;
    }
}

export const accessTokenManager = new AccessTokenManager();
