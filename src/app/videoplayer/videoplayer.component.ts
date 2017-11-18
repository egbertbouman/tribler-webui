import { Component, Input, HostBinding, OnInit } from '@angular/core';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'videoplayer',
    templateUrl: './videoplayer.component.html',
    styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit {
    // @Input() infohash: string;
    infohash = 'C260CADB582DC2D15F2391FE21FB7B884A18D531';
    port = 0;
    url;

    @HostBinding('class')
    someBaseClass = 'd-flex flex-column flex-grow';

    constructor(private triblerService: TriblerService) { }

    ngOnInit() {
        this.triblerService.getVariables().subscribe((vars: any) => {
            this.port = vars.ports['video~port'];
            this.url = `http://127.0.0.1:${this.port}/${this.infohash}/0`;
            const video = document.getElementsByTagName('video')[0];
            video.src = this.url;
            video.load();
        });
    }
}
