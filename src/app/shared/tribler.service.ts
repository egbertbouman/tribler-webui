import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Torrent } from './torrent.model';
import { Channel } from './channel.model';
import { Playlist } from './playlist.model';
import { Download } from './download.model';

declare var EventSource: any;

@Injectable()
export class TriblerService {
    private _api_base = '//localhost:8085';

    constructor(private _http: Http) {
    }

    addType(objects: any[], type: string) {
        // Torrents / channels / playlists need a type so that we can distinguish between them
        // when a put them in a list.
        for(var i = 0; i < objects.length; i ++)
            objects[i].type = type;
    }

    getRandomTorrents(): Observable<Torrent[]> {
        return this._http.get(this._api_base + '/torrents/random?limit=50')
            .map(res => res.json().torrents)
            .do(items => this.addType(items, 'torrent'));
    }

    getChannelOverview(id: string): Observable<Object> {
        return this._http.get(this._api_base + `/channels/discovered/${id}`)
            .map(res => res.json().overview);
    }
    getPopularChannels(): Observable<Channel[]> {
        return this._http.get(this._api_base + '/channels/popular?limit=50')
            .map(res => res.json().channels)
            .do(items => this.addType(items, 'channel'));
    }
    getChannels(): Observable<Channel[]> {
        return this._http.get(this._api_base + '/channels/discovered')
            .map(res => res.json().channels)
            .do(items => this.addType(items, 'channel'));
    }
    getSubscribedChannels(): Observable<Channel[]> {
        return this._http.get(this._api_base + '/channels/subscribed')
            .map(res => res.json().subscribed)
            .do(items => this.addType(items, 'channel'));
    }
    getTorrentsForChannel(id: string): Observable<Torrent[]> {
        return this._http.get(this._api_base + `/channels/discovered/${id}/torrents`)
            .map(res => res.json().torrents)
            .do(items => this.addType(items, 'torrent'));
    }
    getPlaylistsForChannel(id: string) : Observable<Playlist[]> {
        return this._http.get(this._api_base + `/channels/discovered/${id}/playlists`)
            .map(res => res.json().playlists)
            .do(items => this.addType(items, 'playlist'));
    }

    getDownloads(): Observable<Download[]> {
        return this._http.get(this._api_base + '/downloads?get_pieces=1')
            .map(res => res.json().downloads);
    }
    startDownload(destination: string, uri: string, hops: number): Observable<string> {
        return this._http.put(this._api_base + '/downloads', `anon_hops=${hops}&safe_seeding=1&destination=${destination}&uri=${uri}`)
            .map(res => res.json());
    }

    searchCompletions(term: string): Observable<Download[]> {
        return this._http.get(this._api_base + `/search/completions?q=${term}`)
            .map(res => res.json().completions);
    }

    getEvents(): Observable<any[]> {
        return Observable.create(observer => {
            const eventSource = new EventSource(this._api_base + '/events');
            eventSource.onmessage = x => observer.next(JSON.parse(x.data));
            eventSource.onerror = x => observer.error(JSON.parse(x));
            return () => {
                eventSource.close();
            };
        });
    }
}
