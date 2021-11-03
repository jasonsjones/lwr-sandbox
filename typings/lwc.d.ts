declare module 'lwc' {
    export function createElement(
        name: string,
        opts: { is: typeof LightningElement; mode?: 'open' | 'closed' }
    ): HTMLElement;
}
