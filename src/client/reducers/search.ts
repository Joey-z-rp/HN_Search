import { SEARCH, HANDLE_SEARCH_RESULT, HANDLE_INPUT_CHANGE, HANDLE_PAGE_CHANGE } from '../actions/search';

const initialState = {
    isFetching: false,
    searchFor: '',
    input: '',
    result: [],
    page: 1,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH:
            return { ...state, isFetching: true, searchFor: action.searchFor };

        case HANDLE_SEARCH_RESULT:
            return { ...state, isFetching: false, result: action.result };

        case HANDLE_INPUT_CHANGE:
            return { ...state, input: action.input };

        case HANDLE_PAGE_CHANGE:
            return { ...state, page: action.page };

        default:
            return state;
    }
}
