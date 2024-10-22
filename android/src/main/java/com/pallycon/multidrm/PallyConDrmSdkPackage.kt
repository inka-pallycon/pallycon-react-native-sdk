package com.pallycon.multidrm

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import java.util.*

class PallyConDrmSdkPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return mutableListOf(PallyConDrmSdk(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<ViewManager<*, ReactShadowNode<*>>> {
        return Collections.emptyList();
    }
}
