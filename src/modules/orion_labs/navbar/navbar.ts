import { LightningElement } from 'lwc';

export default class NavBar extends LightningElement {
    handleClick(event: Event): void {
        event.preventDefault();
        console.log('navigate to home...');
    }
}
