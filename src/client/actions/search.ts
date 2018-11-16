import fetch from "cross-fetch";

// action types

export const SEARCH = 'SEARCH';
export const HANDLE_SEARCH_RESULT = 'HANDLE_SEARCH_RESULT';
export const HANDLE_INPUT_CHANGE = 'HANDLE_INPUT_CHANGE';
export const HANDLE_PAGE_CHANGE = 'HANDLE_PAGE_CHANGE';

// action creators
​
export function searchAction(searchFor) {
    return { searchFor, type: SEARCH };
}

export function handleSearchResultAction(result) {
    return { result, type: HANDLE_SEARCH_RESULT };
}

export function handleInputChangeAction(input) {
    return { input, type: HANDLE_INPUT_CHANGE };
}

export function handlePageChangeAction(page) {
    return { page, type: HANDLE_PAGE_CHANGE };
}

// async actions


export function doSearch() {
    return (dispatch, getState) => {
        const input = getState().search.input;
        dispatch(searchAction(input));

        return fetch(`http://hn.algolia.com/api/v1/search?query=${input}&tags=story`)
            .then(response => response.json())
            .then(result => dispatch(handleSearchResultAction(result)))
            .catch(err => console.log(err));
    };
}