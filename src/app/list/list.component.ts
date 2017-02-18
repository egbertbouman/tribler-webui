import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    @Input() title = "";
    @Input() items = [];
    @Input() showBackButton = false;

    itemsShown = [];
    throttle = 300;
    scrollDistance = 2;

    constructor(private _location: Location) {
    }

    ngOnInit() {
        this.initalItems();
    }

    initalItems() {
        this.itemsShown = [];
        this.addItems(0, Math.min(this.items.length, 100));
    }

    addItems(startIndex, endIndex) {
        startIndex = Math.min(startIndex, this.items.length);
        endIndex = Math.min(endIndex, this.items.length);

        for (let i = startIndex; i < endIndex; ++i) {
            this.itemsShown.push(this.items[i]);
        }
    }

    ngOnChanges() {
        this.initalItems();
    }

    onScrollDown() {
        // Add another 20 items
        this.addItems(this.itemsShown.length, this.itemsShown.length + 20);
    }

    back() {
        this._location.back();
    }
}
