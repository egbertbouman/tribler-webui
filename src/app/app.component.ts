import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { TriblerService } from './shared/tribler.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TriblerService]
})
export class AppComponent implements OnInit {
    constructor(private router: Router,
                public triblerService: TriblerService) {
    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            document.body.scrollTop = 0;
        });
    }
}
