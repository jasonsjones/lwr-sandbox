import AppPage from '../../pageObjects/app';

describe('LWR App', () => {
    it('has top level app custom element', async () => {
        await browser.url('/');

        const appRoot = await utam.load(AppPage);
        expect(appRoot instanceof AppPage).toBe(true);

        const app = await appRoot.getApp();
        expect(await app.isPresent()).toBe(true);
    });

    it('includes an LWR router container', async () => {
        await browser.url('/');

        const appRoot = await utam.load(AppPage);
        expect(appRoot instanceof AppPage).toBe(true);
        const rc = appRoot.getRouterContainer();
        expect(await (await rc).isPresent()).toBe(true);
    });

    it('includes a main layout', async () => {
        await browser.url('/');

        const appRoot = await utam.load(AppPage);
        expect(appRoot instanceof AppPage).toBe(true);
        const layout = appRoot.getMainLayout();
        expect(await (await layout).isPresent()).toBe(true);
    });
});
