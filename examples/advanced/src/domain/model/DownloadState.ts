export const downloadState = {
    running: 'running',
    pending: 'pending',
    pause: 'pause',
    failed: 'failed',
    success: 'success',
} as const;

export type DownloadStateUnion =
    typeof downloadState[keyof typeof downloadState];
