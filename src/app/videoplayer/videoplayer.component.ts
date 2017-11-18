import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'videoplayer',
    templateUrl: './videoplayer.component.html',
    styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit {
    // @Input() infohash: string;
    infohash;
    fileindex = 0;
    port = 0;
    url;

    @HostBinding('class')
    someBaseClass = 'd-flex flex-column flex-grow';

    constructor(private triblerService: TriblerService,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.params
            .subscribe(params => {
                if (params['id1'] !== undefined && params['id2'] !== undefined) {
                    this.infohash = params['id1'];
                    this.fileindex = params['id2'];

                    this.triblerService.getVariables().subscribe((vars: any) => {
                        this.port = vars.ports['video~port'];
                        this.url = `http://127.0.0.1:${this.port}/${this.infohash}/${this.fileindex}`;
                        const video = document.getElementsByTagName('video')[0];
                        video.src = this.url;
                        video.load();
                        video.play();
                    });
                }
            });
    }
}
