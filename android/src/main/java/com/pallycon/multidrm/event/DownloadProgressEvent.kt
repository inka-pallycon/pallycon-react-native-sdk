package com.pallycon.multidrm.event

interface DownloadProgressEvent {
    fun sendProgressEvent(url: String, percent: Float, downloadedBytes: Long)
}
