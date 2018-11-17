import fetch from '../utils/fetch';
import { ISearchResult } from '../../types/search';

// action types

export const SEARCH = 'SEARCH';
export const HANDLE_SEARCH_RESULT = 'HANDLE_SEARCH_RESULT';
export const HANDLE_INPUT_CHANGE = 'HANDLE_INPUT_CHANGE';
export const HANDLE_PAGE_CHANGE = 'HANDLE_PAGE_CHANGE';

// action creators
​
export function searchAction(searchFor: string) {
    return { searchFor, type: SEARCH };
}

export function handleSearchResultAction(result: ISearchResult) {
    return { result, type: HANDLE_SEARCH_RESULT };
}

export function handleInputChangeAction(input: string) {
    return { input, type: HANDLE_INPUT_CHANGE };
}

export function handlePageChangeAction(page: number) {
    return { page, type: HANDLE_PAGE_CHANGE };
}

// async actions

export function doSearch() {
    return (dispatch, getState) => {
        const input = getState().search.input;
        dispatch(searchAction(input));

        return fetch(`http://hn.algolia.com/api/v1/search?query=${input}&tags=story`)
            .then(result => dispatch(handleSearchResultAction(result)))
            .catch(err => console.log(err));
    };
}

export function handlePageChange(page) {
    return (dispatch, getState) => {
        const input = getState().search.input;
        dispatch(handlePageChangeAction(page));

        return fetch(`http://hn.algolia.com/api/v1/search?query=${input}&tags=story&page=${page - 1}`)
            .then(result => dispatch(handleSearchResultAction(result)))
            .catch(err => console.log(err));
    };
}
