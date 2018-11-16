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
    title: string;
    url: string;
    author: string;
    points: number;
    story_text: string | null;
    comment_text: string | null;
    num_comments: number;
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
