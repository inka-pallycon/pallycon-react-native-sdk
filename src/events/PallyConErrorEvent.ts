export interface PallyConErrorEvent {
    /** The track url */
    url: string | null;
    /** error code */
    errorCode: string | null;
    /** error message */
    message: string | null;
}
