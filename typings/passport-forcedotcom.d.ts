declare module 'passport-forcedotcom' {
    import passport = require('passport');

    interface IStrategyOptionBase {
        clientID: string;
        clientSecret: string;
        scope: string[];
        callbackURL: string;
    }
    export class Strategy extends passport.Strategy {
        constructor(
            options: IStrategyOption,
            verify: (
                accessToken: string,
                refreshToken: string,
                profile: Profile,
                done: (error: any, user?: any) => void
            ) => void
        );
    }
}
