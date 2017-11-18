import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'subscriptions',
    templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent implements OnInit {
    channels = [];
    channelId;

    constructor(private triblerService: TriblerService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.refreshSubscribedChannels();
    }

    refreshSubscribedChannels() {
        this.triblerService.getSubscribedChannels()
            .subscribe(channels => this.channels = channels);
    }

    openChannelModal(content) {
        this.channelId = undefined;
        this.modalService.open(content);
    }

    addChannel() {
        if (this.channelId !== undefined) {
            this.triblerService.subscribeChannel(this.channelId).subscribe(
                data => this.refreshSubscribedChannels(),
                error => console.log(error)
            );
        }
    }
}
