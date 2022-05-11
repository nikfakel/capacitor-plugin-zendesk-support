import Foundation
import SDKConfigurations
import ZendeskCoreSDK
import SupportSDK
import SupportProvidersSDK
import ChatSDK
import ChatProvidersSDK
import AnswerBotProvidersSDK
import MessagingSDK
import MessagingAPI

@objc public class ZendeskSupport: NSObject {
    @objc public func initialize(_ appId: String,_ clientId: String,_ zendeskUrl: String,_ messagingId: String,_ debugLog: Bool) throws {
        if (debugLog) {
            CoreLogger.enabled = debugLog
            CoreLogger.logLevel = .debug
        }
        
        Zendesk.initialize(appId: appId, clientId: clientId, zendeskUrl: zendeskUrl)
        Support.initialize(withZendesk: Zendesk.instance)
        AnswerBot.initialize(withZendesk: Zendesk.instance, support: Support.instance!)
        Chat.initialize(massagingId: messagingId)
    }

    @objc public func setAnonymousIdentity(_ name: String,_ email: String) {
        let identity = Identity.createAnonymous(name: name, email: email)
        Zendesk.instance?.setIdentity(identity)
    }

    @objc public func setIdentity(_ token: String) {
        let identity = Identity.createJwt(token: token)
        Zendesk.instance?.setIdentity(identity)
    }

    @objc public func showUserTickets(_ viewCtrl: UIViewController?) {
        DispatchQueue.main.async {
            let requestListController = RequestUi.buildRequestList()
            let navController = UINavigationController(rootViewController: requestListController)
            viewCtrl?.present(navController, animated: true, completion: nil)
        }
    }

    @objc public func openChat(_ viewCtrl: UIViewController?) throws {
        DispatchQueue.main.async {
            do {
                let messagingConfiguration = MessagingConfiguration()
                let answerBotEngine = try AnswerBotEngine.engine()
                let supportEngine = try SupportEngine.engine()
                let chatEngine = try ChatEngine.engine()
                let viewController = try Messaging.instance.buildUI(engines: [answerBotEngine, chatEngine, supportEngine],
                                                            configs: [messagingConfiguration])
                
                let navController = UINavigationController(rootViewController: viewController)
                viewCtrl?.present(navController, animated: true)
            } catch {
                
            }
        }
    }
}
