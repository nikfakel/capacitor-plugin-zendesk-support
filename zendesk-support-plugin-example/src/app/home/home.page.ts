import { Component, OnInit } from '@angular/core';
import { ZendeskSupport } from "capacitor-plugin-zendesk-support";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {
  }

  async ngOnInit() {
    await this.initialize();

    await ZendeskSupport.setIdentity({token: '200182'});
  }

  async initialize() {
    await ZendeskSupport.initialize({
      appId: 'b35e6558d3ecac4ef0a85fa5f9780b953939f6bcd39be038',
      clientId: 'mobile_sdk_client_3ee565581b3e13653c7f',
      zendeskUrl: 'https://koten.zendesk.com',
      iosChatId: 'sdf',
      androidChatId: 'sddf',
      webClientId: '62ab5ec6-4919-47d4-a979-00a53b15ee42',
      debugLog: true
    });
  }

  async openChat() {
    try {
      await ZendeskSupport.openChat();
    } catch (error) {
      console.log(error);
    }
  }
}
