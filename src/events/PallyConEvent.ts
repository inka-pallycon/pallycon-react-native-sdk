import {PallyConEventType} from "./PallyConEventType";
import {PallyConReceiveEvent, PallyConErrorEvent, ProgressEvent} from "./";

type EnumKeys = keyof typeof PallyConEventType;
type EnumKeyFields = {
    [key in EnumKeys]:any;
}
export interface PallyConEvent extends EnumKeyFields{
    [PallyConEventType.complete]: PallyConReceiveEvent;
    [PallyConEventType.pause]: PallyConReceiveEvent;
    [PallyConEventType.remove]: PallyConReceiveEvent;
    [PallyConEventType.stop]: PallyConReceiveEvent;
    [PallyConEventType.download]: PallyConReceiveEvent;
    [PallyConEventType.contentDataError]: PallyConErrorEvent;
    [PallyConEventType.drmError]: PallyConErrorEvent;
    [PallyConEventType.licenseServerError]: PallyConErrorEvent;
    [PallyConEventType.downloadError]: PallyConErrorEvent;
    [PallyConEventType.networkConnectedError]: PallyConErrorEvent;
    [PallyConEventType.detectedDeviceTimeModifiedError]: PallyConErrorEvent;
    [PallyConEventType.migrationError]: PallyConErrorEvent;
    [PallyConEventType.licenseCipherError]: PallyConErrorEvent;
    [PallyConEventType.unknownError]: PallyConErrorEvent;
    [PallyConEventType.progress]: ProgressEvent;
}
