import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressbarModule, ProgressbarConfig } from 'ng2-bootstrap/ng2-bootstrap';
import { Observable } from 'rxjs/Rx';

import { FileSizePipe } from '../file-size.pipe';
import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'app-downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.css'],
    providers: [TriblerService]
})
export class DownloadsComponent implements OnInit {
    downloads = [];

    constructor(private _triblerService: TriblerService) {
    }

    ngOnInit() {
        return Observable
            .interval(2000)
            .startWith(0)
            .flatMap(() => {
                return this._triblerService.getDownloads();
            }).subscribe(downloads => this.downloads = downloads);
    }
}
