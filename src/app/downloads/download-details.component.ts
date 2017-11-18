import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'download-details',
    templateUrl: './download-details.component.html',
    styleUrls: ['./download-details.component.css']
})
export class DownloadDetailsComponent implements OnInit, OnDestroy {
    @Input() download: any;

    constructor(private triblerService: TriblerService) {
    }

    ngOnInit() {
        this.triblerService.getPeers = true;
        this.triblerService.getPieces = true;
    }

    ngOnDestroy() {
        this.triblerService.getPeers = false;
        this.triblerService.getPieces = false;
    }

    getState(peer) {
        let state = '';
        if (peer['optimistic']) {
            state += 'O,';
        }
        if (peer['uinterested']) {
            state += 'UI,';
        }
        if (peer['uchoked']) {
            state += 'UC,';
        }
        if (peer['uhasqueries']) {
            state += 'UQ,';
        }
        if (!peer['uflushed']) {
            state += 'UBL,';
        }
        if (peer['dinterested']) {
            state += 'DI,';
        }
        if (peer['dchoked']) {
            state += 'DC,';
        }
        if (peer['snubbed']) {
            state += 'S,';
        }
        return state + peer['direction'];
    }
}
