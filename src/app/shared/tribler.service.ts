import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
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
    searchResults = [];
    searchQuery$;

    constructor(private _http: Http) {
        this.getEvents().subscribe();
        this.searchQuery$ = new ReplaySubject(1);
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

    getChannel(id: string): Observable<Object> {
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
    subscribeChannel(id: string) {
        return this._http.put(this._api_base + `/channels/subscribed/${id}`, '')
            .map(res => res.json());
    }
    unsubscribeChannel(id: string) {
        return this._http.delete(this._api_base + `/channels/subscribed/${id}`)
            .map(res => res.json());
    }
    getMyChannel() {
        return this._http.get(this._api_base + '/mychannel')
            .map(res => res.json().mychannel);
    }
    createMyChannel(name: string, description: string) {
        return this._http.put(this._api_base + '/channels/discovered', `name=${name}&description=${description}`)
            .map(res => res.json());
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
        return this._http.get(this._api_base + '/downloads?get_pieces=1&get_peers=1')
            .map(res => res.json().downloads);
    }
    startDownload(destination: string, uri: string, hops: number): Observable<string> {
        return this._http.put(this._api_base + '/downloads', `anon_hops=${hops}&safe_seeding=1&destination=${destination}&uri=${uri}`)
            .map(res => res.json());
    }
    stopDownload(infohash: string): Observable<string> {
        return this._http.patch(this._api_base + `/downloads/${infohash}`, 'state=stop')
            .map(res => res.json().modified);
    }
    resumeDownload(infohash: string): Observable<string> {
        return this._http.patch(this._api_base + `/downloads/${infohash}`, 'state=resume')
            .map(res => res.json().modified);
    }
    removeDownload(infohash: string, remove_data: boolean): Observable<string> {
        var options = new RequestOptions({body: `remove_data=${(remove_data) ? 1 : 0}`});
        return this._http.delete(this._api_base + `/downloads/${infohash}`, options)
            .map(res => res.json().removed);
    }

    searchCompletions(term: string): Observable<Download[]> {
        return this._http.get(this._api_base + `/search/completions?q=${encodeURI(term)}`)
            .map(res => res.json().completions);
    }
    search(term: string): Observable<Download[]> {
        console.log(this.searchResults.length);
        console.log('CLEAR!');
        this.searchQuery$.next(term);
        // Clear the old search results
        this.searchResults.length = 0;
        while(this.searchResults.length > 0) {
           this.searchResults.pop();
        }
        return this._http.get(this._api_base + `/search?q=${term}`)
            .map(res => res.json());
    }


    getEvents(): Observable<any[]> {
        console.log('events');
        return Observable.create(observer => {
            const eventSource = new EventSource(this._api_base + '/events');
            eventSource.onmessage = x => observer.next(this._processEvent(JSON.parse(x.data)));
            eventSource.onerror = x => observer.error(JSON.parse(x));
            return () => {
                eventSource.close();
            };
        });
    }
    _processEvent(json) {
        console.log(json);
        switch (json.type) {
            case'search_result_channel':
              var channel = json.event.result;
              if (channel.torrents > 0) {
                channel.type = 'channel';
                this.searchResults.push(channel);
              }
              break;
            case'search_result_torrent':
              var torrent = json.event.result;
              torrent.type = 'torrent';
              this.searchResults.push(torrent);
              break;
            case'channel_discovered':
              console.log('channel_discovered');
              break;
            case'torrent_discovered':
              console.log('torrent_discovered');
              break;
        }
    }
}
