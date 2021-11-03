import { LightningElement, api } from 'lwc';
import { Router, PageReference } from 'lwr/router';

export default class RouteContainer extends LightningElement {
    @api router: Router<PageReference>;
}
