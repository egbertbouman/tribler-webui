import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.css'],
    host: { 'class': 'd-flex flex-column flex-grow' }
})
export class DownloadsComponent implements OnInit {
    downloads = [];
    selected = [];

    constructor(private _triblerService: TriblerService) {
    }

    ngOnInit() {
        return this._triblerService.downloads.subscribe(downloads => {
            this.downloads = downloads;

            var selected = this.selected[0];
            if (selected !== undefined) {
                var self = this;
                this.selected[0] = undefined;
                this.downloads.forEach(function (value, index) {
                    if (value && selected.infohash === value.infohash) {
                        self.selected[0] = value;
                    }
                });
            }
        });
    }
    
    resumeDownload() {
        if (this.selected[0] === undefined) {
            return;
        }
        this._triblerService.resumeDownload(this.selected[0].infohash).subscribe();
    }

    stopDownload() {
        if (this.selected[0] === undefined) {
            return;
        }
        this._triblerService.stopDownload(this.selected[0].infohash).subscribe();
    }

    removeDownload(remove_data: boolean) {
        if (this.selected[0] === undefined) {
            return;
        }
        this._triblerService.removeDownload(this.selected[0].infohash, remove_data).subscribe();
    }

    onSelect({ selected }) {
        console.log('Select Event', selected, this.selected);
    }

    onActivate(event) {
        console.log('Activate Event', event);
    }
}
