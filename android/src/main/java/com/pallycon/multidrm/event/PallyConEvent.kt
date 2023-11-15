package com.pallycon.multidrm.event

import com.pallycon.multidrm.models.EventType

interface PallyConEvent {
    fun sendPallyConEvent(url: String, eventType: EventType, message: String, errorCode: String = "")
}
