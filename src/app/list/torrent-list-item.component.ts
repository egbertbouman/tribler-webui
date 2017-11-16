import { Component, Input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TriblerService } from '../shared/tribler.service';
import { Torrent } from '../shared/torrent.model';
import { FileSizePipe } from '../file-size.pipe';
import { AbbreviatePipe } from '../abbreviate.pipe';
import { TorrentDownloadComponent } from './torrent-download.component';

@Component({
    selector: 'torrent-item',
    templateUrl: './torrent-list-item.component.html',
    styleUrls: ['./list-item.css']
})
export class TorrentListItemComponent {
    @Input() torrent: Torrent;

    constructor(private _triblerService: TriblerService,
                private _modalService: NgbModal) {
    }

    play() {
        console.log("play " + this.torrent.infohash);
    }

    open_download_modal(torrent) {
        const modalRef = this._modalService.open(TorrentDownloadComponent, {size: 'lg'});
        // The service needs to be set first
        modalRef.componentInstance.triblerService = this._triblerService;
        modalRef.componentInstance.magnet = `magnet:?xt=urn:btih:${torrent.infohash}&dn=${torrent.name}`;
    }
}