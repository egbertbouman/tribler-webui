import { Component, OnInit, Input, HostListener } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TriblerService } from '../shared/tribler.service';
import { Torrent } from '../shared/torrent.model';
import { TorrentDownloadComponent } from './torrent-download.component';
import { HealthComponent } from '../shared/health.component';

@Component({
    selector: 'torrent-item',
    templateUrl: './torrent-list-item.component.html',
    styleUrls: ['./list-item.css']
})
export class TorrentListItemComponent implements OnInit {
    @Input() torrent: Torrent;
    health;
    healthChecking = false;

    constructor(private triblerService: TriblerService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
    }

    @HostListener('click', ['$event.target'])
    onClick(target: any) {
        this.updateHealth();
    }

    updateHealth() {
        this.healthChecking = true;
        this.triblerService.getTorrentHealth(this.torrent.infohash).subscribe(health => {
            this.health = health;
            this.healthChecking = false;
        }, error => {
            this.healthChecking = false;
        });
    }

    play() {
        console.log('play ' + this.torrent.infohash);
    }

    openDownloadModal(torrent) {
        const modalRef = this.modalService.open(TorrentDownloadComponent, {size: 'lg'});
        // The service needs to be set first
        modalRef.componentInstance.triblerService = this.triblerService;
        modalRef.componentInstance.magnet = `magnet:?xt=urn:btih:${torrent.infohash}&dn=${torrent.name}`;
    }
}
