import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {
    @Input() title = '';
    @Input() items = [];
    @Input() showBackButton = false;
    @Input() showHeader = true;

    itemsMaxShown = 20;
    throttle = 300;
    scrollDistance = 2;

    constructor(private location: Location) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.itemsMaxShown = 20;
    }

    onScrollDown() {
        // Add another 20 items
        this.itemsMaxShown = Math.max(this.itemsMaxShown, this.itemsMaxShown + 20);
    }

    back() {
        this.location.back();
    }

    trackByFn(index, item) {
        return index; // or item.id
    }
}
