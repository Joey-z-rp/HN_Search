import { ISearchResult } from './search';

export interface IState {
    navigation: INavigationState;
    search: ISearchState;
}

export interface INavigationState {
    showSidebar: boolean;
}

export interface ISearchState {
    error: Error | null;
    isFetching: boolean;
    searchFor: string;
    input: string;
    result: ISearchResult;
    page: number;
}

export interface IAction {
    type: string;
    [key: string]: any;
}
