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

    constructor(private triblerService: TriblerService) {
    }

    toggleSubscription(event) {
        if (this.channel.subscribed) {
            this.triblerService.unsubscribeChannel(this.channel.dispersy_cid).subscribe(
                data => { this.channel.subscribed = false; this.channel.votes -= 1; },
                error => console.log(error)
            );
        } else {
            this.triblerService.subscribeChannel(this.channel.dispersy_cid).subscribe(
                data => { this.channel.subscribed = true; this.channel.votes += 1; },
                error => console.log(error)
            );
        }
        event.stopPropagation();
    }

}
