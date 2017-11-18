import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'videomenu',
    templateUrl: './videomenu.component.html',
    styleUrls: ['./videomenu.component.css']
})
export class VideomenuComponent implements OnInit {
    download;

    constructor(private triblerService: TriblerService,
                public router: Router) { }

    ngOnInit() {
        this.triblerService.downloads.subscribe(downloads => {
            const self = this;
            downloads.forEach(function (value, index) {
                if (value && value.vod_mode && value !== self.download) {
                    self.download = value;
                }
            });
        });
    }
}
