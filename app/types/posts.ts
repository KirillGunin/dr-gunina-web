export type PostQueryParams = {
    page: number;
    text: string;
    sort: 'new' | 'old' | 'popular' | '';
};

export type Meta = {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
};

export type PostReaction = {
    count: number;
    emoji: string;
};

export type PostMedia = {
    duration: null;
    height: number;
    kind: string;
    mime: null;
    url: string;
    width: number;
};

export type Post = {
    date: string;
    forwardedFrom: null;
    html: string;
    id: number;
    isAlbum: boolean;
    link: string;
    media: PostMedia[];
    messageId: number;
    poll: null;
    reactions: PostReaction[];
    slug: string;
    text: string;
    title: string;
    subtitle: string;
    webpage: null;
};

export interface PostsResponse {
    data: Post[];
    meta: Meta;
}
