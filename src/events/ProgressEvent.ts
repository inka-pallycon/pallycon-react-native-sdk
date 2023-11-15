export interface ProgressEvent {
    /** The track url */
    url: string | null;
    /** percent for downloaded */
    percent: number | null;
    /** bytes for downloaded */
    downloadedBytes: number | null;
}
