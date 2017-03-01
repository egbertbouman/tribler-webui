import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'channel',
    template: `<list [showBackButton]="true" [title]="overview?.name" [items]="items"></list>`
})
export class ChannelComponent implements OnInit {
    overview;
    items = [];

    constructor(
        private _triblerService: TriblerService,
        private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this._activatedRoute.params
            .map(params => params['id'])
            .subscribe(id => {
                this._triblerService.getChannelOverview(id)
                    .subscribe(overview => this.overview = overview);
                this._triblerService.getTorrentsForChannel(id)
                    .subscribe(torrents => this.items = this.items.concat(torrents));
                this._triblerService.getPlaylistsForChannel(id)
                    .subscribe(playlists => this.items = this.items.concat(playlists));
            });
    }
}
