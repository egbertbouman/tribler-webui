// For compile-time type checking and code completion

export interface Download {
    files: string[];
    max_download_speed: number;
    vod_prebuffering_progress_consec: number;
    pieces?: string;
    num_peers: number;
    availability: number;
    size: number;
    speed_down: number;
    speed_up: number;
    ratio: number;
    hops: number;
    destination: string;
    anon_download: boolean;
    max_upload_speed: number;
    progress: number;
    time_added: number;
    status: string;
    total_down: number;
    total_up: number;
    num_seeds: number;
    name: string;
    trackers: string[];
    total_pieces: number;
    vod_mode: boolean;
    safe_seeding: boolean;
    eta: number;
    error: string;
    vod_prebuffering_progress: number;
    infohash: string;
}
