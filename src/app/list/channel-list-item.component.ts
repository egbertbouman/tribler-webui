import { Component, Input } from '@angular/core';

import { Channel } from '../shared/channel.model';
import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'channel-item',
    templateUrl: './channel-list-item.component.html',
    styleUrls: ['./list-item.css']
})
export class ChannelListItemComponent {
    @Input() channel: Channel;

    constructor(private _triblerService: TriblerService) {
    }

    toggle_subscription(event) {
        if (this.channel.subscribed) {
            this._triblerService.unsubscribeChannel(this.channel.dispersy_cid).subscribe(
                data => { this.channel.subscribed = false; this.channel.votes -= 1 },
                error => console.log(error)
            );
        }
        else {
            this._triblerService.subscribeChannel(this.channel.dispersy_cid).subscribe(
                data => { this.channel.subscribed = true; this.channel.votes += 1 },
                error => console.log(error)
            );
        }
        event.stopPropagation();
    }

}