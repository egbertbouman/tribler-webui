import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'channel',
    template: `<list [showBackButton]="true" [title]="channel?.name" [items]="items"></list>`
})
export class ChannelComponent implements OnInit {
    channel;
    items = [];

    constructor(
        private triblerService: TriblerService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params
            .map(params => params['id'])
            .subscribe(id => {
                this.triblerService.getChannel(id)
                    .subscribe(channel => this.channel = channel);
                this.triblerService.getTorrentsForChannel(id)
                    .subscribe(torrents => this.items = this.items.concat(torrents));
                this.triblerService.getPlaylistsForChannel(id)
                    .subscribe(playlists => this.items = this.items.concat(playlists));
            });
    }
}
