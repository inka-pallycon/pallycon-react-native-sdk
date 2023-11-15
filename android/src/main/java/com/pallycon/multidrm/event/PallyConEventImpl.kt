package com.pallycon.multidrm.event

import android.os.Looper
import com.pallycon.multidrm.models.EventMessage
import com.pallycon.multidrm.models.EventType
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter

class PallyConEventImpl(private val reactContext: ReactContext
): PallyConEvent {
    override fun sendPallyConEvent(
        url: String,
        eventType: EventType,
        message: String,
        errorCode: String
    ) {
        if (Looper.getMainLooper().thread == Thread.currentThread()) {
            reactContext.getJSModule(RCTDeviceEventEmitter::class.java).emit(
                eventType.toString(),
                EventMessage(
                    eventType,
                    url,
                    message,
                    errorCode
                ).toReactMap()
            )
        } else {
            GlobalScope.launch(Dispatchers.Main) {
                reactContext.getJSModule(RCTDeviceEventEmitter::class.java).emit(
                    eventType.toString(),
                    EventMessage(
                        eventType,
                        url,
                        message,
                        errorCode
                    ).toReactMap()
                )
            }
        }
    }
}
