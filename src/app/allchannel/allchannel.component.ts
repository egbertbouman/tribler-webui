import { Component, OnInit } from '@angular/core';
import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'allchannel',
    template: `<list [title]="'Discovered channels'" [items]="channels"></list>`
})
export class AllChannelComponent implements OnInit {
    channels = [];

    constructor(private triblerService: TriblerService) {
    }

    ngOnInit() {
         this.triblerService.getChannels()
             .subscribe(channels => this.channels = channels );
    }
}
