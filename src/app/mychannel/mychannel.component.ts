import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TriblerService } from '../shared/tribler.service';

@Component({
  selector: 'mychannel',
  templateUrl: './mychannel.component.html',
  styleUrls: ['./mychannel.component.css']
})
export class MyChannelComponent implements OnInit {
    mychannel;
    channelName = '';
    channelDescription = '';

    constructor(private triblerService: TriblerService,
                private modalService: NgbModal) { }

    ngOnInit() {
        this.refreshMyChannel();
    }

    refreshMyChannel() {
        this.triblerService.getMyChannel().subscribe(
            data => this.mychannel = data,
            error => this.mychannel = undefined
        );
    }

    open_mychannel_modal(content) {
        this.modalService.open(content);
    }

    create_mychannel() {
        if (this.channelName !== undefined) {
            this.triblerService.createMyChannel(this.channelName, this.channelDescription).subscribe(
                data => this.refreshMyChannel(),
                error => console.log(error)
            );
        }
    }

    update_mychannel() {
        if (this.channelName !== undefined) {
            this.triblerService.updateMyChannel(this.channelName, this.channelDescription).subscribe(
                data => this.refreshMyChannel(),
                error => console.log(error)
            );
        }
    }
}
