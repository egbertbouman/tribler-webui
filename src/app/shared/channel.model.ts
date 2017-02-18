// For compile-time type checking and code completion

export interface Channel {
    torrents: number;
    votes: number;
    name: string;
    spam: number;
    dispersy_cid: string;
    id: number;
    modified: number;
    description: string;
    subscribed: boolean;
    can_edit: boolean;
}
