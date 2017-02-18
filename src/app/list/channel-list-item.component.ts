import { Component, Input } from '@angular/core';

import { Channel } from '../shared/channel.model';

@Component({
    selector: 'channel-item',
    templateUrl: './channel-list-item.component.html',
    styleUrls: ['./list-item.css']
})
export class ChannelListItemComponent {
    @Input() channel: Channel;
}