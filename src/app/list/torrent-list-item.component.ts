import { Component, Input } from '@angular/core';

import { Torrent } from '../shared/torrent.model';
import { FileSizePipe } from '../file-size.pipe';
import { AbbreviatePipe } from '../abbreviate.pipe';
import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'torrent-item',
    templateUrl: './torrent-list-item.component.html',
    styleUrls: ['./list-item.css'],
    providers: [TriblerService]

})
export class TorrentListItemComponent {
    @Input() torrent: Torrent;

    hops = 1;
    location = '';

    constructor(private _triblerService: TriblerService) {
    }

    play() {
        console.log("play " + this.torrent.infohash);
    }

    download() {
        console.log("download " + this.torrent.infohash);
        this._triblerService.startDownload('', `magnet:?xt=urn:btih:${this.torrent.infohash}&dn=${this.torrent.name}`, this.hops)
            .subscribe();
        console.log("download2 " + this.torrent.infohash);
    }
}