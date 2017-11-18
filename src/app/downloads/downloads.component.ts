import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit, OnDestroy {
    downloads = [];
    selected = [];
    subscription;

    @HostBinding('class')
    someBaseClass = 'd-flex flex-column flex-grow';

    constructor(private triblerService: TriblerService) {
    }

    ngOnInit() {
        this.subscription = this.triblerService.downloads.subscribe(downloads => {
            this.downloads = downloads;

            const selected = this.selected[0];
            if (selected !== undefined) {
                const self = this;
                this.selected[0] = undefined;
                this.downloads.forEach(function (value, index) {
                    if (value && selected.infohash === value.infohash) {
                        self.selected[0] = value;
                    }
                });
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    resumeDownload() {
        if (this.selected[0] === undefined) {
            return;
        }
        this.triblerService.resumeDownload(this.selected[0].infohash).subscribe();
    }

    stopDownload() {
        if (this.selected[0] === undefined) {
            return;
        }
        this.triblerService.stopDownload(this.selected[0].infohash).subscribe();
    }

    removeDownload(removeData: boolean) {
        if (this.selected[0] === undefined) {
            return;
        }
        this.triblerService.removeDownload(this.selected[0].infohash, removeData).subscribe();
    }

    onSelect({ selected }) {
        console.log('Select Event', selected, this.selected);
    }

    onActivate(event) {
        console.log('Activate Event', event);
    }
}
