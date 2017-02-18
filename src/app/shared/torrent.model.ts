// For compile-time type checking and code completion

export interface Torrent {
    category: string;
    name: string;
    num_leechers: number;
    last_tracker_check: number;
    num_seeders: number;
    infohash: string;
    id: number;
    size: number;
}
