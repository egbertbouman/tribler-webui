import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'subscriptions',
    templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent implements OnInit {
    channels = [];
    channel_id;

    constructor(private _triblerService: TriblerService,
                private _modalService: NgbModal) {
    }

    ngOnInit() {
        this.refreshSubscribedChannels();
    }

    refreshSubscribedChannels() {
        this._triblerService.getSubscribedChannels()
            .subscribe(channels => this.channels = channels );
    }

    open_channel_modal(content) {
        this._modalService.open(content);
    }

    add_channel() {
        if (this.channel_id !== undefined) {
            this._triblerService.subscribeChannel(this.channel_id).subscribe(
                data => this.refreshSubscribedChannels(),
                error => console.log(error)
            );
        };
    }
}
