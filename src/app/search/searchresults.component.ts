import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { TriblerService } from '../shared/tribler.service';
import { ListComponent } from '../list/list.component';
@Component({
    selector: 'searchresults',
    template: `<list [title]="'Search results' + (query ? ' for &quot;' + query + '&quot;' : '')" [items]="items"></list>`
})
export class SearchresultsComponent implements OnInit, OnDestroy {
    @ViewChild(ListComponent) list: ListComponent;
    items;
    subscription;
    query;

    constructor(private triblerService: TriblerService) {
    }

    ngOnInit() {
        this.items = this.triblerService.searchResults;
        this.subscription = this.triblerService.searchQuery.subscribe(query => {
            this.query = query;
            // Reset itemsMaxShown
            this.list.itemsMaxShown = 20;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
