import { WebPlugin } from '@capacitor/core';

import type { AnonymousOptions, HelpCenterOptions, IdentityOption, InitializeOptions, ZendeskSupportPlugin } from './definitions';

export class ZendeskSupportWeb
  extends WebPlugin
  implements ZendeskSupportPlugin {

  async initialize(options: InitializeOptions): Promise<void> {
    console.log(options);
    const scriptUrl = `https://static.zdassets.com/ekr/snippet.js?key=${options.webClientId}`;
    const node = document.createElement('script');
    node.src = scriptUrl;
    node.type = 'text/javascript';
    node.async = true;
    node.id = 'ze-snippet';
    document.getElementsByTagName('head')[0].appendChild(node);
    node.addEventListener('load', () => {
      window.zE('webWidget', 'hide');
      window.zE('webWidget:on', 'close', function () {
        window.zE('webWidget', 'hide');
      });
    });
  }

  async setAnonymousIdentity(options: AnonymousOptions): Promise<void> {
    console.log('setAnonymousIdentity not implemented on web yet!', options);
  }

  async setIdentity(option: IdentityOption): Promise<void> {
    console.log('setIdentity not implemented on web yet!', option);
  }

  async showHelpCenter(options: HelpCenterOptions): Promise<void> {
    console.log('open chat replaced');
    console.log('showHelpCenter not implemented on web yet!', options);
  }

  async openChat(): Promise<void> {
    window.zE('webWidget', 'open');
    window.zE('webWidget', 'show');
  }

  async showUserTickets(): Promise<void> {
    console.log('showUserTickets not implemented on web yet!');
  }

  async closeChat(): Promise<void> {
    window.zE('webWidget', 'close');
  }
}
