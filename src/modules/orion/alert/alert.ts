import { api, LightningElement } from 'lwc';

type AlertType = 'info' | 'danger';

export default class Alert extends LightningElement {
    @api type: AlertType;
}
