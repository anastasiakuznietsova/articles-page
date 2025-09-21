export interface Article{
    id:number;
    title: string;
    authors: Authors[];
    url:string;
    image_url: string;
    news_site: string;
    summary: string;
    published_at: Date;
    updated_at: Date;
    featured: boolean;
    launches: Launches[];
    events: Events[];
}

export interface Authors {
    name:string;
    socials: Socials;
}

export interface Socials {
    x: string;
    youtube: string;
    instagram: string;
    linkedin: string;
    mastodon: string;
    bluesky: string;
}

export interface Launches {
    launch_id: string;
    provider: string;
}

export interface Events {
    event_id:number;
    provider:string;
}

export interface PageableArticle {
    count:number;
    next: string;
    previous: string;
    results: Article[];
}