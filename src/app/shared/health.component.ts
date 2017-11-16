import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'health',
    template: `
        <span
            class="badge badge-outline"
            [ngClass]="{'text-warning': _health === undefined,
                        'text-success': _health !== undefined && _health.seeders > 0,
                        'text-danger': _health !== undefined && _health.seeders <= 0}">
            {{ (_health === undefined) ? 'unknown' : (_health.seeders > 0) ? 'good' : 'bad'}}
        </span>
    `
})
export class HealthComponent implements OnInit {
    _health;

    constructor() { }

    ngOnInit() {
    }

    @Input()
    set health(health: any) {
        if (health === undefined)
            return;
        health.seeders = 0;
        health.leechers = 0;
        for (var key in health) {
            var value = health[key];
            if (!isNaN(value.seeders))
                health.seeders = Math.max(health.seeders, value.seeders);
            if (!isNaN(value.leechers))
                health.leechers = Math.max(health.leechers, value.leechers);
        }
        this._health = health;
    }
}
