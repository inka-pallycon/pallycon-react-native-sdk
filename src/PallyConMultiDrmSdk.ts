import {DeviceEventEmitter, EmitterSubscription, NativeEventEmitter, NativeModules, Platform} from 'react-native';
import {PallyConContentConfiguration} from "./models/PallyConContentConfiguration";
import {PallyConEvent, PallyConEventType} from "./events";
import base64 from "react-native-base64";
import {PallyConDownloadState} from "./models";

/*
PallyCon SDK for using Multi-DRM.
 */
const { PallyConDrmSdkModule: PallyConDrmSdk } = NativeModules;
const emitter =
    Platform.OS !== 'android'
        ? new NativeEventEmitter(PallyConDrmSdk)
        : DeviceEventEmitter;

/**
 * Initializes the PallyConMultiDrmSdk.
 *
 * @param siteId issued by the PallyCon.
 */
export function initialize(siteId: String) {
    return PallyConDrmSdk.initialize(siteId);
}

/**
 * release the PallyConMultiDrmSdk.
 * The PallyConMultiDrmSdk must not be used after calling this method.
 */
export function release() {
    PallyConDrmSdk.release();
}

/**
 * set PallyCon Event
 */
export function setPallyConEvents() {
    PallyConDrmSdk.setPallyConEvents();
}

/**
 * function that creates the objects needed to play the player.
 *
 * @param config Information about the content
 * @see PallyConContentConfiguration
 * @returns If the player has a Base64 string
 * @throws ILLEGAL_ARGUMENT when the input parameters are null or incorrect
 */
export async function getObjectForContent(config: PallyConContentConfiguration): Promise<string> {
    const object = await PallyConDrmSdk.getObjectForContent(config);
    const encoded: string = base64.encode(object);
    return encoded;
}

/**
 * Get a PallyConDownloadState.
 *
 * @param config Information about the content
 * @see PallyConContentConfiguration
 * @returns state of download for content
 * @see PallyConDownloadState
 * @throws ILLEGAL_ARGUMENT when the input parameters are null or incorrect
 */
export async function getDownloadState(config: PallyConContentConfiguration): Promise<PallyConDownloadState> {
    const state = await PallyConDrmSdk.getDownloadState(config);
    switch (state) {
        case 'DOWNLOADING': {
            return PallyConDownloadState.DOWNLOADING;
        }
        case 'COMPLETED': {
            return PallyConDownloadState.COMPLETED
        }
        case 'PAUSED': {
            return PallyConDownloadState.PAUSED;
        }
        default: {
            return PallyConDownloadState.NOT;
        }
    }
}

/**
 * Add the specified listener, this call passes through
 *
 * @param eventType name of the event for which we are registering listener
 * @param listener the listener function
 * @see PallyConEvent
 * @returns EmitterSubscription represents a subscription with listener and context data.
 * @see EmitterSubscription
 */
export function addPallyConEvent<T extends PallyConEventType>(
    eventType: T,
    listener: PallyConEvent[T] extends never
        ? () => void
        : (eventType: PallyConEvent[T]) => void
): EmitterSubscription {
    return emitter.addListener(eventType, listener);
}

/**
 * Starts the service if not started already and adds a new download.
 * If an error occurs during DRM download, [PallyConEventType.downloadError] called.
 *
 * @param config Information about the content
 * @see PallyConContentConfiguration
 * @throws ILLEGAL_ARGUMENT when the input parameters are null or incorrect
 */
export async function addStartDownload(config: PallyConContentConfiguration): Promise<void> {
    PallyConDrmSdk.addStartDownload(config);
}

/**
 * Starts the service if not started already and resumes all downloads.
 */
export function resumeDownloads() {
    PallyConDrmSdk.resumeDownloads();
}

/**
 * Starts the service in not started already and cancels all downloads.
 */
export function cancelDownloads() {
    PallyConDrmSdk.cancelDownloads();
}

/**
 * Starts the service in not started already and pauses all downloads.
 */
export function pauseDownloads() {
    PallyConDrmSdk.pauseDownloads();
}

/**
 * Remove the content already downloaded.
 *
 * @param config Information about the content
 * @see PallyConContentConfiguration
 * @throws ILLEGAL_ARGUMENT when the input parameters are null or incorrect
 */
export async function removeDownload(config: PallyConContentConfiguration): Promise<void> {
    PallyConDrmSdk.removeDownload(config);
}

/**
 * Remove offline licenses already downloaded.
 *
 * @param config Information about the content
 * @see PallyConContentConfiguration
 * @throws ILLEGAL_ARGUMENT when the input parameters are null or incorrect
 */
export async function removeLicense(config: PallyConContentConfiguration): Promise<void> {
    PallyConDrmSdk.removeLicense(config);
}

export async function needsMigrateDatabase(config: PallyConContentConfiguration): Promise<boolean> {
    return await PallyConDrmSdk.needsMigrateDatabase(config);
}

export async function migrateDatabase(config: PallyConContentConfiguration): Promise<boolean> {
    return await PallyConDrmSdk.migrateDatabase(config);
}

export async function reDownloadCertification(): Promise<boolean> {
    return await PallyConDrmSdk.reDownloadCertification();
}

export async function updateSecureTime(): Promise<boolean> {
    return await PallyConDrmSdk.updateSecureTime();
}
