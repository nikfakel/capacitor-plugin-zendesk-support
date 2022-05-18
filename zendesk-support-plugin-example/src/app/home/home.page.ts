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

    // await ZendeskSupport.setAnonymousIdentity({ name: 'tets pid', email: "nikfakel@gmail.com" });
  }

  async initialize() {
    await ZendeskSupport.initialize({
      appId: '8b2441ab061feb902a75f2a9cdb53c209aa3ab98ad433a5e',
      clientId: 'mobile_sdk_client_9c45bfe7532f5e0004f7',
      zendeskUrl: 'https://sasha800i.zendesk.com',
      iosChatId: 'eyJzZXR0aW5nc191cmwiOiJodHRwczovL3Nhc2hhODAwaS56ZW5kZXNrLmNvbS9tb2JpbGVfc2RrX2FwaS9zZXR0aW5ncy8wMUczQlBGNTI2M1hUR0tUTjVXRTZFWUtKWS5qc29uIn0=',
      androidChatId: 'eyJzZXR0aW5nc191cmwiOiJodHRwczovL3Nhc2hhODAwaS56ZW5kZXNrLmNvbS9tb2JpbGVfc2RrX2FwaS9zZXR0aW5ncy8wMUczQkc4TkVaUlk4VzRBRks2RUM2TTQzNi5qc29uIn0=',
      webClientId: '5d7b20cd-408b-4557-a513-f35afbbcaef4',
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
