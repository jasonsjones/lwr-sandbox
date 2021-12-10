import { LightningElement } from 'lwc';
import type { PageReference } from 'lwr/navigation';
export default class Footer extends LightningElement {
    get twitterPageRef(): PageReference {
        return this.generateExternalPage('https://twitter.com/_jasonsjones');
    }

    get gitHubPageRef(): PageReference {
        return this.generateExternalPage('https://github.com/jasonsjones');
    }

    generateExternalPage(url: string): PageReference {
        return {
            type: 'external_webpage',
            attributes: {
                url
            }
        };
    }
}
