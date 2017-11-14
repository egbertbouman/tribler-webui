import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'torrent-download',
    templateUrl: './torrent-download.component.html',
    styleUrls: ['./torrent-download.component.css']
})
export class TorrentDownloadComponent implements OnInit {
    _torrent;
    magnet;
    torrent_files;
    error = '';

    hops = 0;
    location = '';
    files = [];

    triblerService;

    constructor(public activeModal: NgbActiveModal,
                private _router: Router) {
    }

    ngOnInit() {
    }

    @Input()
    set torrent(torrent: any) {
      this._torrent = torrent;
      this.magnet = `magnet:?xt=urn:btih:${torrent.infohash}&dn=${torrent.name}`
      this.triblerService.getTorrentInfo(this.magnet).subscribe(
            data => {
                this.torrent_files = data.info.files || [{path: [data.info.name], length: data.info.length}];
                this.error = '';
            },
            error => {
                 this.torrent_files = undefined;
                 this.error = "Error while trying to fetch torrent";
            }
        );
    }

    download() {
        var selected_files = [];
        this.torrent_files.forEach(function(value, index) {
            if (!value.excluded) {
                selected_files.push(value.path[0]);
            }
        });

        this.activeModal.close('Download')
        this._router.navigateByUrl("/downloads");
        this.triblerService.startDownload(this.location, this.magnet, this.hops, selected_files)
            .subscribe();
    }
}
