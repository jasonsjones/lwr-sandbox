import AppPage from '../../pageObjects/app';

describe('LWR App', () => {
    it('has top level app custom element', async () => {
        await browser.url('/');

        const appRoot = await utam.load(AppPage);
        expect(appRoot instanceof AppPage).toBe(true);

        const app = await appRoot.getApp();
        expect(await app.isPresent()).toBe(true);
    });
});
