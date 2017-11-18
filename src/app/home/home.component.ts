import { Component, OnInit } from '@angular/core';
import { TriblerService } from '../shared/tribler.service';

declare var EventSource: any;

@Component({
    selector: 'home',
    template: `<list [title]="'Recommended for you'" [items]="items"></list>`
})
export class HomeComponent implements OnInit {
    items = [];

    constructor(private triblerService: TriblerService) {
    }

    ngOnInit() {
         this.triblerService.getRandomTorrents()
             .subscribe(torrents => this.items = this.items.concat(torrents));
         this.triblerService.getPopularChannels()
             .subscribe(channels => this.items = this.items.concat(channels));
    }
}
