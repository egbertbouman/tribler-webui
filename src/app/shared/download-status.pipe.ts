import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'downloadStatus' })
export class DownloadStatusPipe implements PipeTransform {

    private statusStrings = {
        DLSTATUS_ALLOCATING_DISKSPACE: 'Allocating disk space',
        DLSTATUS_WAITING4HASHCHECK: 'Waiting for check',
        DLSTATUS_HASHCHECKING: 'Checking',
        DLSTATUS_DOWNLOADING: 'Downloading',
        DLSTATUS_SEEDING: 'Seeding',
        DLSTATUS_STOPPED: 'Stopped',
        DLSTATUS_STOPPED_ON_ERROR: 'Stopped on error',
        DLSTATUS_METADATA: 'Waiting for metadata',
        DLSTATUS_CIRCUITS: 'Building circuits'
    };

    transform(status: string): string {
        if (this.statusStrings[status] === undefined) { return '?'; }
        return this.statusStrings[status];
    }
}
