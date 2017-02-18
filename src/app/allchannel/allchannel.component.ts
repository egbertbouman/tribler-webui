import { Component, OnInit } from '@angular/core';
import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'app-allchannel',
    template: `<list [title]="'Discovered channels'" [items]="channels"></list>`,
    providers: [TriblerService]
})
export class AllChannelComponent implements OnInit {
    channels = [];

    constructor(private _triblerService: TriblerService) {
    }

    ngOnInit() {
         this._triblerService.getChannels()
             .subscribe(channels => this.channels = channels );
    }
}
