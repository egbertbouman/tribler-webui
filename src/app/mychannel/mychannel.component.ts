import { Component, OnInit } from '@angular/core';

import { TriblerService } from '../shared/tribler.service';

@Component({
  selector: 'mychannel',
  templateUrl: './mychannel.component.html',
  styleUrls: ['./mychannel.component.css']
})
export class MyChannelComponent implements OnInit {
    mychannel;

    constructor(private _triblerService: TriblerService) { }

    ngOnInit() {
        this._triblerService.getMyChannel().subscribe(
            data => this.mychannel = data,
            error => this.mychannel = undefined
        );
    }

}
