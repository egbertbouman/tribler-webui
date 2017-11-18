import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'download-details',
    templateUrl: './download-details.component.html',
    styleUrls: ['./download-details.component.css']
})
export class DownloadDetailsComponent implements OnInit, OnDestroy {
    @Input() download: any;

    constructor(private _triblerService: TriblerService) {
    }

    ngOnInit() {
        this._triblerService.get_peers = true;
        this._triblerService.get_pieces = true;
    }

    ngOnDestroy() {
        this._triblerService.get_peers = false;
        this._triblerService.get_pieces = false;
    }

    get_state(peer) {
        var state = "";
        if (peer['optimistic'])
            state += "O,";
        if (peer['uinterested'])
            state += "UI,";
        if (peer['uchoked'])
            state += "UC,";
        if (peer['uhasqueries'])
            state += "UQ,";
        if (!peer['uflushed'])
            state += "UBL,";
        if (peer['dinterested'])
            state += "DI,";
        if (peer['dchoked'])
            state += "DC,";
        if (peer['snubbed'])
            state += "S,";
        return state + peer['direction']
    }
}
