import { WebPlugin } from '@capacitor/core';
export class ZendeskSupportWeb extends WebPlugin {
    async initialize(options) {
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
    async setAnonymousIdentity(options) {
        console.log('setAnonymousIdentity not implemented on web yet!', options);
    }
    async setIdentity(option) {
        console.log('setIdentity not implemented on web yet!', option);
    }
    async openChat() {
        window.zE('webWidget', 'open');
        window.zE('webWidget', 'show');
    }
    async closeChat() {
        window.zE('webWidget', 'close');
    }
}
//# sourceMappingURL=web.js.map