//
//  EventEmitter.swift
//  RNPallyConDrmSdk
//
//  Created by sungju Yun on 2023/01/30.
//  Copyright © 2023 Facebook. All rights reserved.
//

import Foundation

class EventEmitter {

    public static var shared = EventEmitter()

    private var eventEmitter: RNPallyConDrmSdk!

    func register(eventEmitter: RNPallyConDrmSdk) {
        self.eventEmitter = eventEmitter
    }

    func emit(event: PallyConEventType, body: Any?) {
        self.eventEmitter.sendEvent(withName: event.name, body: body)
    }

    var allEvents = [
        PallyConEventType.complete.name,
        PallyConEventType.download.name,
        PallyConEventType.pause.name,
        PallyConEventType.remove.name,
        PallyConEventType.stop.name,
        PallyConEventType.contentDataError.name,
        PallyConEventType.drmError.name,
        PallyConEventType.licenseServerError.name,
        PallyConEventType.downloadError.name,
        PallyConEventType.networkConnectedError.name,
        PallyConEventType.detectedDeviceTimeModifiedError.name,
        PallyConEventType.migrationError.name,
        PallyConEventType.licenseCipherError.name,
        PallyConEventType.unknownError.name,
        PallyConEventType.progress.name,
    ]
}
