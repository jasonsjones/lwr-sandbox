import AppPage from '../../pageObjects/app';

describe('LWR Sandbox App', () => {
    let appRoot: AppPage;

    beforeEach(async () => {
        await browser.url('/');
        appRoot = await utam.load(AppPage);
        expect(appRoot instanceof AppPage).toBe(true);
    });

    it('has top level app custom element', async () => {
        const app = await appRoot.getApp();
        expect(await app.isPresent()).toBe(true);
    });

    it('includes an LWR router container', async () => {
        const rc = await appRoot.getRouterContainer();
        expect(await rc.isPresent()).toBe(true);
    });

    it('includes a main layout', async () => {
        const layout = await appRoot.getMainLayout();
        expect(await layout.isPresent()).toBe(true);
    });

    it('layout has a navbar', async () => {
        const layout = await appRoot.getMainLayout();
        const navbar = await layout.getNavbar();
        expect(await navbar.isPresent()).toBe(true);
    });

    it('layout has a footer', async () => {
        const layout = await appRoot.getMainLayout();
        const footer = await layout.getFooter();
        expect(await footer.isPresent()).toBe(true);
    });
});
