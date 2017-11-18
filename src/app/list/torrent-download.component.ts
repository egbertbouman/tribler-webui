import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'torrent-download',
    templateUrl: './torrent-download.component.html',
    styleUrls: ['./torrent-download.component.css']
})
export class TorrentDownloadComponent implements OnInit {
    // tslint:disable-next-line:variable-name
    _magnet;
    torrentFiles;
    error = '';

    hops = 0;
    location = '';
    files = [];

    triblerService;

    constructor(public activeModal: NgbActiveModal,
                private router: Router) {
    }

    ngOnInit() {
    }

    @Input()
    set magnet(magnet: any) {
      this._magnet = magnet;
      this.triblerService.getTorrentInfo(this._magnet).subscribe(
            data => {
                this.torrentFiles = data.info.files || [{path: [data.info.name], length: data.info.length}];
                this.error = '';
            },
            error => {
                 this.torrentFiles = undefined;
                 this.error = 'Error while trying to fetch torrent';
            }
        );
    }

    download() {
        const selectedFiles = [];
        this.torrentFiles.forEach(function(value, index) {
            if (!value.excluded) {
                selectedFiles.push(value.path[0]);
            }
        });

        this.activeModal.close('Download');
        this.router.navigateByUrl('/downloads');
        this.triblerService.startDownload(this.location, this.magnet, this.hops, selectedFiles)
            .subscribe();
    }
}
