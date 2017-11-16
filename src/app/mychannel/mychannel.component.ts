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
    channel_name = '';
    channel_description = '';

    constructor(private _triblerService: TriblerService,
                private _modalService: NgbModal) { }

    ngOnInit() {
        this.refresh_mychannel();
    }

    refresh_mychannel() {
        this._triblerService.getMyChannel().subscribe(
            data => this.mychannel = data,
            error => this.mychannel = undefined
        );
    }

    open_mychannel_modal(content) {
        this._modalService.open(content);
    }

    create_mychannel() {
        if (this.channel_name !== undefined) {
            this._triblerService.createMyChannel(this.channel_name, this.channel_description).subscribe(
                data => this.refresh_mychannel(),
                error => console.log(error)
            );
        };
    }

    update_mychannel() {
        if (this.channel_name !== undefined) {
            this._triblerService.updateMyChannel(this.channel_name, this.channel_description).subscribe(
                data => this.refresh_mychannel(),
                error => console.log(error)
            );
        };
    }
}
