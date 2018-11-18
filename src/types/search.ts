export interface ISearchResult {
    hits: IHit[];
    nbHits: number;
    page: number;
    nbPages: number;
    hitsPerPage: number;
    processingTimeMS: number;
    exhaustiveNbHits: boolean;
    query: string;
    params: string;
}

export interface IHit {
    created_at: string;
    title: string | null;
    url: string | null;
    author: string;
    points: number;
    story_text: string | null;
    comment_text: string | null;
    num_comments: number | null;
    story_id: number | null;
    story_title: string | null;
    story_url: string | null;
    parent_id: number | null;
    created_at_i: number;
    _tags: string[];
    objectID: string;
    _highlightResult: {
        title: IHightlightResultItem;
        url: IHightlightResultItem;
        author: IHightlightResultItem;
    };
}

interface IHightlightResultItem {
    value: string;
    matchLevel: string;
    fullyHighlighted?: boolean;
    matchedWords: string[];
}

export const enum SearchType {
    All,
    Stories,
    Comments,
}

export const enum SortOrder {
    Popularity,
    Date,
}

export const enum DateRange {
    AllTime,
    LastDay,
    PastWeek,
    PastMonth,
    PastYear,
    Custom,
}
