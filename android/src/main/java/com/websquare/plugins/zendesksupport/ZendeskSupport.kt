package com.websquare.plugins.zendesksupport

import android.content.Context
import android.util.Log
import zendesk.android.Zendesk
import zendesk.messaging.android.DefaultMessagingFactory

class ZendeskSupport {
    fun initialize(context: Context?, url: String?, appId: String?, clientId: String?, androidChatId: String?, debugLog: Boolean) {
        if (debugLog) Log.i("Initialized", "Done")

        Zendesk.initialize(
                context = context!!,
                channelKey = androidChatId!!,
                successCallback = { zendesk ->
                    Log.i("IntegrationApplication", zendesk.toString())
                    Log.i("IntegrationApplication", "Initialization successful")
                },
                failureCallback = { error ->
                    // Tracking the cause of exceptions in your crash reporting dashboard will help to triage any unexpected failures in production
                    Log.e("IntegrationApplication", "Initialization failed", error)
                },
                messagingFactory = DefaultMessagingFactory()
        )
    }

    fun setAnonymousIdentity(name: String?, email: String?) {
        Log.i("Warning", "No anonymous identity")
    }

    fun setIdentity(token: String?) {
        Zendesk.instance.loginUser(jwt = token!!,
                successCallback = { user ->
                    Log.i("User", user.toString())
                },
                failureCallback = { error ->
                    Log.i("Error", error.toString())
                }
        )
    }

    fun openChat(context: Context) {
        Zendesk.instance.messaging.showMessaging(context)
    }
}
