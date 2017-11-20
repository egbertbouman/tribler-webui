import { Component, Input, ViewChild, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'videoplayer',
    templateUrl: './videoplayer.component.html',
    styleUrls: ['./videoplayer.component.css'],
})
export class VideoplayerComponent implements OnInit, OnDestroy {
    // @Input() infohash: string;
    download;
    fileindex = 0;
    port = 0;
    url;

    @ViewChild('player')
    player;

    @HostBinding('class')
    someBaseClass = 'd-flex flex-column flex-grow';

    constructor(private triblerService: TriblerService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.triblerService.streams
            .subscribe((event: any) => {
                console.log(event);
                if (event.type === 'play') {
                    this.download = event.download;
                    this.fileindex = event.fileindex;

                    this.triblerService.getVariables().subscribe((vars: any) => {
                        this.port = vars.ports['video~port'];
                        this.url = `http://127.0.0.1:${this.port}/${this.download.infohash}/${this.fileindex}`;
                        this.player.nativeElement.src = this.url;
                        this.player.nativeElement.load();
                        if (event.autoPlay) { this.player.nativeElement.play(); }
                    });
                }
            });

        this.triblerService.downloads
            .subscribe((downloads) => {
                let vodDownload;
                const self = this;
                downloads.forEach(function(download, index) {
                    if (self.download && self.download.infohash === download.infohash) {
                        vodDownload = download;
                    }
                });
                this.download = vodDownload;
            });
    }

    ngOnDestroy() {
        this.player.nativeElement.src = '';
        this.player.nativeElement.load();
        this.player = undefined;
    }
}
