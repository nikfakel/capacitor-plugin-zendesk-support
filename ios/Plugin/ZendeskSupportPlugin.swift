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
            let debugLog = call.getBool("debugLog") ?? false
            try implementation.initialize( appId, clientId, zendeskUrl, debugLog)
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
    
    @objc func showHelpCenter(_ call: CAPPluginCall) {
        do {
            try implementation.showHelpCenter(bridge?.viewController)
        } catch {}
        call.resolve()
    }
    
    @objc func showHelpCenterArticle(_ call: CAPPluginCall) {
        let articleId = call.getString("articleId") ?? ""
        implementation.showHelpCenterArticle(bridge?.viewController, articleId)
        call.resolve()
    }
    
    @objc func showTicketRequest(_ call: CAPPluginCall) {
        let subject = call.getString("subject") ?? ""
        let tgs = call.getArray("tags", [])
        let flds = call.getArray("fields", [])
        
        var tags: [String] = []
        var fields: [String] = []
        if (!tgs.isEmpty) {
            for tg in tgs {
                if let tag = tg as? String {
                    tags.append(tag)
                }
            }
        }
        
        if (!flds.isEmpty) {
            for fld in flds {
                if let field = fld as? String {
                    fields.append(field)
                }
            }
        }
        
        implementation.showTicketRequest(bridge?.viewController, subject, tags, fields)
    }
    
    @objc func showUserTickets(_ call: CAPPluginCall) {
        implementation.showUserTickets(bridge?.viewController)
    }
    
    @objc func openChat(_ call: CAPPluginCall) {
        guard let bridge = self.bridge else {
            call.resolve()
            return
        }
        
        do {
            try implementation.openChat(bridge.viewController)
        } catch {}
    }
}
