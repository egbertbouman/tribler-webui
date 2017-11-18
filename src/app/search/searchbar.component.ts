import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TorrentDownloadComponent } from '../list/torrent-download.component';
import { TriblerService } from '../shared/tribler.service';

@Component({
    selector: 'searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
    public query: string;
    magnet;

    completions = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term =>
                this.triblerService.searchCompletions(term)
                    .catch(() => {
                        return Observable.of([]);
                    })
                    .map((completions: any) => [term].concat(completions))
            )

    constructor(private triblerService: TriblerService,
                private router: Router,
                private modalService: NgbModal) {
    }

    ngOnInit() {
    }

    openMagnetModal(content) {
        this.magnet = undefined;
        const modalRef = this.modalService.open(content);
    }

    addMagnet() {
        const modalRef = this.modalService.open(TorrentDownloadComponent, {size: 'lg'});
        // The service needs to be set first
        modalRef.componentInstance.triblerService = this.triblerService;
        modalRef.componentInstance.magnet = this.magnet;
    }

    search() {
        this.router.navigateByUrl('/search');
        this.triblerService.search(this.query).subscribe(
            data => console.log(data),
            error => console.log(error)
        );
    }
}
