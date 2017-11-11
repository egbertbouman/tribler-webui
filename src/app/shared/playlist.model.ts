// For compile-time type checking and code completion
import { Torrent } from './torrent.model';

export interface Playlist {
    id: number;
    name: string;
    description: string;
    torrents: Torrent[];
}
