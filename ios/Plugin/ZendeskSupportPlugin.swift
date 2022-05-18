import Foundation
import Capacitor
import UIKit
/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(ZendeskSupportPlugin)
public class ZendeskSupportPlugin: CAPPlugin, UINavigationControllerDelegate {
    private let implementation = ZendeskSupport()

    @objc func initialize(_ call: CAPPluginCall) {
        do {
            let appId = call.getString("appId") ?? ""
            let clientId = call.getString("clientId") ?? ""
            let zendeskUrl = call.getString("zendeskUrl") ?? ""
            let chatAccountKey = call.getString("chatAccountKey") ?? ""
            let messagingId = call.getString("iosChatId") ?? ""
            let debugLog = call.getBool("debugLog") ?? false
            try implementation.initialize( appId, clientId, zendeskUrl, messagingId)
            call.resolve()
        } catch {
            call.reject(error.localizedDescription, nil, error)
        }
    }

    @objc func setAnonymousIdentity(_ call: CAPPluginCall) {
        let name = call.getString("name") ?? ""
        let email = call.getString("email") ?? ""
        implementation.setAnonymousIdentity(name, email)
        call.resolve()
    }

    @objc func setIdentity(_ call: CAPPluginCall) {
        let token = call.getString("token") ?? ""
        implementation.setIdentity(token)
        call.resolve()
    }

    @objc func openChat(_ call: CAPPluginCall) {
        implementation.openChat(bridge?.viewController)
    }
}
