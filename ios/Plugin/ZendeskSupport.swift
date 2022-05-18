import Foundation
import ZendeskSDKMessaging
import ZendeskSDK

@objc public class ZendeskSupport: NSObject {
    @objc public func initialize(_ appId: String,_ clientId: String,_ zendeskUrl: String,_ messagingId: String) throws {
        Zendesk.initialize(withChannelKey: messagingId,
                           messagingFactory: DefaultMessagingFactory()) { result in
                if case let .failure(error) = result {
                    print("Messaging did not initialize.\nError: \(error.localizedDescription)")
                }
            }
    }

    @objc public func setAnonymousIdentity(_ name: String,_ email: String) {
        print("No anonimous users")
    }

    @objc public func setIdentity(_ token: String) {
        Zendesk.instance?.loginUser(with: token) { result in
            switch result {
            case .success(let user):
                print("User: \(user)");
            case .failure(let error):
                print(error);
            }
        }
    }

    @objc public func openChat(_ viewCtrl: UIViewController?) {
        DispatchQueue.main.async {
            guard let viewController = Zendesk.instance?.messaging?.messagingViewController() else { return }
            let navController = UINavigationController(rootViewController: viewController)
            viewCtrl?.present(navController, animated: true)
        }
    }
}
