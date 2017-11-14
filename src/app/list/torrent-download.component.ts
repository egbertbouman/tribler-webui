import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'torrent-download',
    templateUrl: './torrent-download.component.html',
    styleUrls: ['./torrent-download.component.css']
})
export class TorrentDownloadComponent implements OnInit {
    @Input() torrent;

    hops = 0;
    location = '';
    triblerService;

    constructor(public activeModal: NgbActiveModal,
                private _router: Router) {
    }

    ngOnInit() {
    }

    download() {
        this.activeModal.close('Download')
        this._router.navigateByUrl("/downloads");
        this.triblerService.startDownload('', `magnet:?xt=urn:btih:${this.torrent.infohash}&dn=${this.torrent.name}`, this.hops)
            .subscribe();
    }
}
