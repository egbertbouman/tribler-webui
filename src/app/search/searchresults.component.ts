import { Component, OnInit, ViewChild } from '@angular/core';

import { TriblerService } from '../shared/tribler.service';
import { ListComponent } from '../list/list.component';
@Component({
    selector: 'searchresults',
    template: `<list [title]="'Search results'" [items]="items"></list>`
})
export class SearchresultsComponent implements OnInit {
    @ViewChild(ListComponent) list: ListComponent;
    items;

    constructor(private triblerService: TriblerService) {
    }

    ngOnInit() {
        this.items = this.triblerService.searchResults;
        this.triblerService.searchQuery.subscribe(data => {
            // Reset itemsMaxShown
            this.list.itemsMaxShown = 20;
        });
    }
}

