import {
    HANDLE_INPUT_CHANGE,
    HANDLE_PAGE_CHANGE,
    HANDLE_SEARCH_RESULT,
    SEARCH,
} from '../actions/search';
import { ISearchResult } from '../../types/search';
import { IAction, ISearchState } from '../../types/stateAndAction';

const initialState = {
    isFetching: false,
    input: '',
    page: 1,
    result: {} as ISearchResult,
    searchFor: '',
};

export default function reducer(
    state: ISearchState = initialState,
    action: IAction,
): ISearchState {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                isFetching: true,
                page: 1,
                result: {} as ISearchResult,
                searchFor: action.searchFor,
            };

        case HANDLE_SEARCH_RESULT:
            return { ...state, isFetching: false, result: action.result };

        case HANDLE_INPUT_CHANGE:
            return { ...state, input: action.input };

        case HANDLE_PAGE_CHANGE:
            return { ...state, isFetching: true, page: action.page };

        default:
            return state;
    }
}
