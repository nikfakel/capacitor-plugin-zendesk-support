'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

const ZendeskSupport = core.registerPlugin('ZendeskSupport', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.ZendeskSupportWeb()),
});

class ZendeskSupportWeb extends core.WebPlugin {
    async initialize(options) {
        const scriptUrl = `https://static.zdassets.com/ekr/snippet.js?key=${options.webClientId}`;
        const node = document.createElement('script');
        node.src = scriptUrl;
        node.type = 'text/javascript';
        node.async = true;
        node.id = 'ze-snippet';
        document.getElementsByTagName('head')[0].appendChild(node);
        node.addEventListener('load', () => {
            const bodyNode = document.querySelector('body');
            if (bodyNode) {
                waitForAddedNode({
                    parent: bodyNode,
                    recursive: false,
                    done: function (el) {
                        window.zE('messenger:set', 'zIndex', -999);
                        const parentNode = el.parentElement;
                        if (parentNode) {
                            const chatNode = parentNode.querySelector('iframe');
                            if (chatNode) {
                                new MutationObserver((mutationsList) => {
                                    for (let mutation of mutationsList) {
                                        if (mutation.type === 'attributes' && mutation.attributeName === "style" && mutation.oldValue) {
                                            if (!mutation.oldValue.includes('display: none')) {
                                                window.zE('messenger:set', 'zIndex', -999);
                                            }
                                        }
                                    }
                                }).observe(chatNode, {
                                    attributes: true,
                                    attributeOldValue: true
                                });
                            }
                        }
                    }
                });
            }
        });
    }
    async setAnonymousIdentity(options) {
        console.log('setAnonymousIdentity not implemented on web yet!', options);
    }
    async setIdentity(option) {
        console.log('setIdentity not implemented on web yet!', option);
    }
    async openChat() {
        try {
            window.zE('messenger', 'open');
            window.zE('messenger:set', 'zIndex', 999);
        }
        catch (error) {
            console.log(error);
        }
    }
}
function waitForAddedNode(params) {
    new MutationObserver(function () {
        const el = document.querySelectorAll('iframe')[1];
        if (el) {
            // @ts-ignore
            this.disconnect();
            params.done(el);
        }
    }).observe(params.parent || document, {
        subtree: !!params.recursive || !params.parent,
        childList: true,
    });
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ZendeskSupportWeb: ZendeskSupportWeb
});

exports.ZendeskSupport = ZendeskSupport;
//# sourceMappingURL=plugin.cjs.js.map
