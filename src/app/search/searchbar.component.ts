import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
    dataSource: Observable<any>;
    query: string;

    constructor(private _triblerService: TriblerService) {
        this.dataSource = Observable.create((observer: any) => {
            this._triblerService.searchCompletions(this.query).subscribe((result: any) => {
                if (result.length > 0) {
                    result.unshift(this.query);
                }
                observer.next(result);
            })
        });
    }

    ngOnInit() {
        //this._triblerService.getEvents().subscribe();
    }

    search() {
        this._triblerService.search(this.query).subscribe(
      data => console.log(data),
         error => console.log(error)

        );
    }
}
