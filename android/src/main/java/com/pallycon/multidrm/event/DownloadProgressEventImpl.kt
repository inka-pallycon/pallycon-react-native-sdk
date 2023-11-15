package com.pallycon.multidrm.event

import android.os.Looper
import com.pallycon.multidrm.models.EventMessage
import com.pallycon.multidrm.models.ProgressMessage
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.pallycon.multidrm.models.EventType

class DownloadProgressEventImpl(private val reactContext: ReactContext
): DownloadProgressEvent {

    override fun sendProgressEvent(url: String, percent: Float, downloadedBytes: Long) {
        if (Looper.getMainLooper().thread == Thread.currentThread()) {
            reactContext.getJSModule(RCTDeviceEventEmitter::class.java).emit(
                EventType.Progress.toString(),
                ProgressMessage(
                    url,
                    percent,
                    downloadedBytes
                ).toReactMap()
            )
        } else {
            GlobalScope.launch(Dispatchers.Main) {
                reactContext.getJSModule(RCTDeviceEventEmitter::class.java).emit(
                    EventType.Progress.toString(),
                    ProgressMessage(
                        url,
                        percent,
                        downloadedBytes
                    ).toReactMap()
                )
            }
        }
    }
}
