import { Component, OnInit } from '@angular/core';
import { ZendeskSupport } from "capacitor-plugin-zendesk-support";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor() {}

  async ngOnInit() {
    await ZendeskSupport.initialize({
      appId: 'b35e6558d3ecac4ef0a85fa5f9780b953939f6bcd39be038',
      clientId: 'mobile_sdk_client_3ee565581b3e13653c7f',
      zendeskUrl: 'https://koten.zendesk.com',
      webClientId: '62ab5ec6-4919-47d4-a979-00a53b15ee42',
      debugLog: true
    });
    // await ZendeskSupport.initialize({appId: 'c17460eb60cfa285accdb580d2dadf104f96f2d2d630e76b', clientId: 'mobile_sdk_client_cab705e2c6ff2b9f32a8', zendeskUrl: 'https://purematrimony.zendesk.com', debugLog: false});
    await ZendeskSupport.setIdentity({token: '200182'});
  }

  async initialize() {

    await ZendeskSupport.initialize({
      appId: 'b35e6558d3ecac4ef0a85fa5f9780b953939f6bcd39be038',
      clientId: 'mobile_sdk_client_3ee565581b3e13653c7f',
      zendeskUrl: 'https://koten.zendesk.com',
      webClientId: '62ab5ec6-4919-47d4-a979-00a53b15ee42',
      debugLog: true
    });
    // await ZendeskSupport.initialize({appId: 'c17460eb60cfa285accdb580d2dadf104f96f2d2d630e76b', clientId: 'mobile_sdk_client_cab705e2c6ff2b9f32a8', zendeskUrl: 'https://purematrimony.zendesk.com', debugLog: false});
  }

  async openHelpCenter() {
    try {
      await ZendeskSupport.showHelpCenter();
    } catch (error) {
      console.log(error);
    }
  }

  async submitRequest() {
    try {
      await ZendeskSupport.openChat();
    } catch (error) {
      console.log(error);
    }
  }

  async viewRequests() {
    try {
      await ZendeskSupport.showUserTickets();
    } catch (error) {
      console.log(error);
    }
  }
}
