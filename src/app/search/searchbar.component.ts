import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
    public query: string;

    completions = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term =>
                this._triblerService.searchCompletions(term)
                    .catch(() => {
                        return Observable.of([]);
                    })
                    .map((completions: any) => [term].concat(completions))
            );


    constructor(private _triblerService: TriblerService,
                private _router: Router) {
    }

    ngOnInit() {
    }

    search() {
        this._router.navigateByUrl("/search");
        this._triblerService.search(this.query).subscribe(
            data => console.log(data),
            error => console.log(error)
        );
    }
}
