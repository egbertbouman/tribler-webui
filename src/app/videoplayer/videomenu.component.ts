import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TriblerService } from '../shared/tribler.service';
import { VideofilePipe } from '../shared/videofile.pipe';

@Component({
    selector: 'videomenu',
    templateUrl: './videomenu.component.html',
    styleUrls: ['./videomenu.component.css']
})
export class VideomenuComponent implements OnInit {
    download;
    fileindex;
    error;

    constructor(public triblerService: TriblerService,
                public router: Router,
                private videofilePipe: VideofilePipe) { }

    ngOnInit() {
        this.triblerService.streams
            .subscribe((event: any) => {
                if (event && event.type === 'wait') {
                    this.download = event.download;
                    this.fileindex = undefined;
                }
                if (event && event.type === 'play') {
                    this.download = event.download;
                    this.fileindex = event.fileindex;
                }
        });

        this.triblerService.downloads
            .subscribe((downloads: any) => {
                const self = this;
                downloads.forEach(function(download, index) {
                    if (self.download && download.infohash === self.download.infohash) {
                        self.download = download;
                    }
                });
            });
    }
}
