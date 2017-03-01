import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { TriblerService } from '../shared/tribler.service';
import { ListComponent } from '../list/list.component';
@Component({
    selector: 'searchresults',
    template: `<list [title]="'Search results'" [items]="items"></list>`
})
export class SearchresultsComponent implements OnInit {
    @ViewChild(ListComponent) list:ListComponent;
    items;

    constructor(private _triblerService: TriblerService) {
    }

    ngOnInit() {
        this.items = this._triblerService.searchResults;
        this._triblerService.searchQuery$.subscribe(data => {
            // Reset itemsMaxShown
            this.list.itemsMaxShown = 20;
        });
    }
}

