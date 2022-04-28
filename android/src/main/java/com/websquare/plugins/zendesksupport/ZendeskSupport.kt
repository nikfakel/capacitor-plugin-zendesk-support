package com.websquare.plugins.zendesksupport

import android.content.Context
import com.zendesk.logger.Logger
import zendesk.core.Zendesk
import zendesk.support.Support
import zendesk.core.AnonymousIdentity
import zendesk.core.Identity
import zendesk.core.JwtIdentity
import zendesk.support.guide.HelpCenterConfiguration
import zendesk.support.guide.HelpCenterActivity
import zendesk.support.guide.ViewArticleActivity
import zendesk.support.request.RequestConfiguration
import zendesk.support.request.RequestActivity
import zendesk.support.CustomField
import zendesk.support.requestlist.RequestListActivity
import zendesk.chat.Chat;
import zendesk.chat.ChatEngine;
import zendesk.messaging.MessagingActivity;
import java.util.ArrayList

class ZendeskSupport {
    fun openChat(context: Context) {
        Chat.INSTANCE.init(context, "InqWFgdu4jxALOMqArAaONDLDZtFFmZV");
        MessagingActivity.builder()
            .withEngines(ChatEngine.engine())
            .show(context);
    }

    // initialize zendesk support sdk
    fun initialize(context: Context?, url: String?, appId: String?, clientId: String?, debugLog: Boolean) {
        Zendesk.INSTANCE.init(context!!, url!!, appId!!, clientId)
        if (debugLog) Logger.setLoggable(true)
        Support.INSTANCE.init(Zendesk.INSTANCE)
    }

    fun setAnonymousIdentity(name: String?, email: String?) {
        val identity = AnonymousIdentity.Builder()
                .withNameIdentifier(name)
                .withEmailIdentifier(email)
                .build()
        Zendesk.INSTANCE.setIdentity(identity)
    }

    fun setIdentity(token: String?) {
        val identity: Identity = JwtIdentity(token)
        Zendesk.INSTANCE.setIdentity(identity)
    }

    fun showHelpCenter(context: Context?, groupBy: String, groupIds: List<Long?>, labels: List<String?>) {
        var builder = HelpCenterActivity.builder()
        if ("category" == groupBy && groupIds.isNotEmpty()) {
            builder = builder.withArticlesForCategoryIds(groupIds)
        } else if ("section" == groupBy && groupIds.isNotEmpty()) {
            builder = builder.withArticlesForSectionIds(groupIds)
        }
        if (labels.isNotEmpty()) {
            builder = builder.withLabelNames(labels)
        }
        builder.show(context!!)
    }

    fun showHelpCenterArticle(context: Context?, articleId: String) {
        ViewArticleActivity.builder(articleId.toLong()).show(context!!)
    }

    fun showUserTickets(context: Context?) {
        RequestListActivity.builder().show(context!!)
    }
}
