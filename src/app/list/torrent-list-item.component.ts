import { Component, Input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TriblerService } from '../shared/tribler.service';
import { Torrent } from '../shared/torrent.model';
import { FileSizePipe } from '../file-size.pipe';
import { AbbreviatePipe } from '../abbreviate.pipe';
import { TorrentDownloadComponent } from 'app/list/torrent-download.component';

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

    download(torrent) {
        const modalRef = this._modalService.open(TorrentDownloadComponent);
        modalRef.componentInstance.torrent = torrent;
        modalRef.componentInstance.triblerService = this._triblerService;
    }
}