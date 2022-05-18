package com.websquare.plugins.zendesksupport

import com.getcapacitor.Plugin
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.PluginMethod
import com.getcapacitor.PluginCall
import java.lang.Exception

@CapacitorPlugin(name = "ZendeskSupport")
class ZendeskSupportPlugin : Plugin() {
    private val implementation = ZendeskSupport()
    @PluginMethod
    fun initialize(call: PluginCall) {
        val appId = call.getString("appId", "")
        val clientId = call.getString("clientId", "")
        val zendeskUrl = call.getString("zendeskUrl", "")
        val androidChatId = call.getString("androidChatId", "")
        val debugLog = call.getBoolean("debugLog", false)
        try {
            implementation.initialize(activity.applicationContext, zendeskUrl, appId, clientId, androidChatId, debugLog ?: false)
            call.resolve()
        } catch (e: Exception) {
            call.reject(e.message, e)
        }
    }

    @PluginMethod
    fun setAnonymousIdentity(call: PluginCall) {
        val name = call.getString("name", "")
        val email = call.getString("email", "")
        implementation.setAnonymousIdentity(name, email)
        call.resolve()
    }

    @PluginMethod
    fun setIdentity(call: PluginCall) {
        val token = call.getString("token", "")
        implementation.setIdentity(token)
        call.resolve()
    }

    @PluginMethod
    fun openChat(call: PluginCall) {
        implementation.openChat(activity)
        call.resolve()
    }
}
