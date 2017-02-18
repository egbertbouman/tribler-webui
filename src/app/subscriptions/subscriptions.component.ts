import { Component, OnInit } from '@angular/core';
import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'app-subscriptions',
    template: `<list [title]="'Subscribed channels'" [items]="channels"></list>`,
    providers: [TriblerService]
})
export class SubscriptionsComponent implements OnInit {
    channels = [];

    constructor(private _triblerService: TriblerService) {
    }

    ngOnInit() {
         this._triblerService.getSubscribedChannels()
             .subscribe(channels => this.channels = channels );
    }
}
