import { Component, OnInit } from '@angular/core';
import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'app-home',
    template: `<list [title]="'Recommended for you'" [items]="items"></list>`,
    providers: [TriblerService]
})
export class HomeComponent implements OnInit {
    items = [];

    constructor(private _triblerService: TriblerService) {
    }

    ngOnInit() {
         this._triblerService.getRandomTorrents()
             .subscribe(torrents => this.items = this.items.concat(torrents));
         this._triblerService.getPopularChannels()
             .subscribe(channels => this.items = this.items.concat(channels));
    }
}
