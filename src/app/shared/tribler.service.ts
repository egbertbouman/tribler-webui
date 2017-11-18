import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Torrent } from './torrent.model';
import { Channel } from './channel.model';
import { Playlist } from './playlist.model';
import { Download } from './download.model';

declare var EventSource: any;


@Injectable()
export class TriblerService {
    apiBase = '//localhost:8085';

    searchResults = [];
    searchQuery;

    downloads;
    getPeers = false;
    getPieces = false;

    constructor(private http: Http) {
        this.getEvents().subscribe();
        this.getDownloads();
        this.searchQuery = new ReplaySubject(1);
        this.downloads = new ReplaySubject(1);
     }

    addType(objects: any[], type: string) {
        // Torrents / channels / playlists need a type so that we can distinguish between them
        // when a put them in a list.
        for (let i = 0; i < objects.length; i ++) {
            objects[i].type = type;
        }
    }

    // Channels

    getChannel(id: string): Observable<Object> {
        return this.http.get(this.apiBase + `/channels/discovered/${id}`)
            .map(res => res.json().overview);
    }
    getPopularChannels(): Observable<Channel[]> {
        return this.http.get(this.apiBase + '/channels/popular?limit=50')
            .map(res => res.json().channels)
            .do(items => this.addType(items, 'channel'));
    }
    getChannels(): Observable<Channel[]> {
        return this.http.get(this.apiBase + '/channels/discovered')
            .map(res => res.json().channels)
            .do(items => this.addType(items, 'channel'));
    }
    getSubscribedChannels(): Observable<Channel[]> {
        return this.http.get(this.apiBase + '/channels/subscribed')
            .map(res => res.json().subscribed)
            .do(items => this.addType(items, 'channel'));
    }
    subscribeChannel(id: string) {
        return this.http.put(this.apiBase + `/channels/subscribed/${id}`, '')
            .map(res => res.json());
    }
    unsubscribeChannel(id: string) {
        return this.http.delete(this.apiBase + `/channels/subscribed/${id}`)
            .map(res => res.json());
    }
    getTorrentsForChannel(id: string): Observable<Torrent[]> {
        return this.http.get(this.apiBase + `/channels/discovered/${id}/torrents`)
            .map(res => res.json().torrents)
            .do(items => this.addType(items, 'torrent'));
    }
    getPlaylistsForChannel(id: string): Observable<Playlist[]> {
        return this.http.get(this.apiBase + `/channels/discovered/${id}/playlists`)
            .map(res => res.json().playlists)
            .do(items => this.addType(items, 'playlist'));
    }

    // Torrents

    getTorrentInfo(magnet): Observable<string> {
        return this.http.get(this.apiBase + `/torrentinfo?uri=${magnet}`)
            .map(res => res.json().metainfo);
    }
    getTorrentHealth(infohash: string) {
        const timeout = 15;
        return this.http.get(this.apiBase + `/torrents/${infohash}/health?timeout=${timeout}`)
            .timeout(timeout * 1000)
            .map(res => res.json().health);
    }
    getRandomTorrents(): Observable<Torrent[]> {
        return this.http.get(this.apiBase + '/torrents/random?limit=50')
            .map(res => res.json().torrents)
            .do(items => this.addType(items, 'torrent'));
    }

   // Download management

    startDownload(destination: string, uri: string, hops: number, selectedFiles: string[]): Observable<string> {
        let body = `anon_hops=${hops}&safe_seeding=1&destination=${encodeURIComponent(destination)}&uri=${encodeURIComponent(uri)}`;
        for (const file of selectedFiles) {
            body += '&selected_files[]=' + encodeURIComponent(file);
        }
        return this.http.put(this.apiBase + '/downloads', body)
            .map(res => res.json());
    }
    stopDownload(infohash: string): Observable<string> {
        return this.http.patch(this.apiBase + `/downloads/${infohash}`, 'state=stop')
            .map(res => res.json().modified);
    }
    resumeDownload(infohash: string): Observable<string> {
        return this.http.patch(this.apiBase + `/downloads/${infohash}`, 'state=resume')
            .map(res => res.json().modified);
    }
    removeDownload(infohash: string, removeData: boolean): Observable<string> {
        const options = new RequestOptions({body: `remove_data=${(removeData) ? 1 : 0}`});
        return this.http.delete(this.apiBase + `/downloads/${infohash}`, options)
            .map(res => res.json().removed);
    }

    // My channel

    getMyChannel() {
        return this.http.get(this.apiBase + '/mychannel')
            .map(res => res.json().mychannel);
    }
    createMyChannel(name: string, description: string) {
        return this.http.put(this.apiBase + '/channels/discovered', `name=${name}&description=${description}`)
            .map(res => res.json());
    }
    updateMyChannel(name: string, description: string) {
        return this.http.post(this.apiBase + '/mychannel', `name=${name}&description=${description}`)
            .map(res => res.json());
    }
    addToMyChannel(channelId: string, uri: string) {
        return this.http.put(this.apiBase + `/channels/discovered/${channelId}/torrents/${uri}`, '')
            .map(res => res.json());
    }

    // Trustchain

    getTrustchainStatistics(): Observable<Object[]> {
        return this.http.get(this.apiBase + '/multichain/statistics')
            .map(res => res.json().statistics);
    }
    getTrustchainBlocks(userId: string): Observable<Object[]> {
        return this.http.get(this.apiBase + `/multichain/blocks/${encodeURIComponent(userId)}`)
            .map(res => res.json().blocks);
    }

    // Search

    search(term: string): Observable<Download[]> {
        this.searchQuery.next(term);
        this.searchResults.length = 0;
        return this.http.get(this.apiBase + `/search?q=${term}`)
            .map(res => res.json());
    }
    searchCompletions(term: string): Observable<Download[]> {
        return this.http.get(this.apiBase + `/search/completions?q=${encodeURIComponent(term)}`)
            .map(res => res.json().completions);
    }

    // Keep track of new events/downloads

    getDownloads() {
        return IntervalObservable
            .create(2000)
            .startWith(0)
            .flatMap(() => {
                return this.http.get(this.apiBase +
                                      `/downloads?get_pieces=${this.getPieces ? 1 : 0}&get_peers=${this.getPeers ? 1 : 0}`)
                    .map(res => res.json().downloads);
            }).subscribe(downloads => this.downloads.next(downloads));
    }
    getEvents(): Observable<any[]> {
        return Observable.create(observer => {
            const eventSource = new EventSource(this.apiBase + '/events');
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
                const channel = json.event.result;
                if (channel.torrents > 0) {
                    channel.type = 'channel';
                    this.searchResults.push(channel);
                }
                break;
            case'search_result_torrent':
                const torrent = json.event.result;
                torrent.type = 'torrent';
                this.searchResults.push(torrent);
                this.searchResults.sort(function(a, b) {
                    if (a.relevance_score < b.relevance_score) { return 1; }
                    if (a.relevance_score > b.relevance_score) { return -1; }
                    return 0;
                });
                break;
            case'channel_discovered':
                console.log('channel_discovered');
                break;
            case'torrent_discovered':
                console.log('torrent_discovered');
                break;
        }
    }

    // Misc

    getVariables(): Observable<Object[]> {
        return this.http.get(this.apiBase + '/variables')
            .map(res => res.json().variables);
    }
}
