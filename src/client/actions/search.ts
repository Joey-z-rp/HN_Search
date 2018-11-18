import * as moment from 'moment';
import fetch from '../utils/fetch';
import { DateRange, ISearchResult, SearchType, SortOrder } from '../../types/search';
import { ISettingsState } from '../../types/stateAndAction';

// action types

export const SEARCH = 'SEARCH';
export const HANDLE_SEARCH_RESULT = 'HANDLE_SEARCH_RESULT';
export const HANDLE_INPUT_CHANGE = 'HANDLE_INPUT_CHANGE';
export const HANDLE_PAGE_CHANGE = 'HANDLE_PAGE_CHANGE';
export const SET_SEARCH_ERROR = 'SET_SEARCH_ERROR';

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

export function setSearchErrorAction(error: Error) {
    return { error, type: SET_SEARCH_ERROR };
}

// async actions

export function doSearch(page?: number) {
    return (dispatch, getState) => {
        const input = getState().search.input;
        const settings = getState().settings;
        const url = generateURL(settings, input, page);

        if (page) {
            dispatch(handlePageChangeAction(page));
        } else {
            dispatch(searchAction(input));
        }

        return fetch(url)
            .then(result => dispatch(handleSearchResultAction(result)))
            .catch(err => dispatch(setSearchErrorAction(err)));
    };
}

// Internal functions

function generateURL(
    settings: ISettingsState,
    input: string,
    page?: number,
): string {
    const base = 'http://hn.algolia.com/api/v1/';

    const endpoint = settings.sortOrder === SortOrder.Date
        ? 'search_by_date'
        : 'search';

    const tags = getTags(settings.searchType);

    const dateRange = getDateRange(settings);

    const hitsPerPage = `&hitsPerPage=${settings.hitsPerPage}`;

    const pageQuery = page ? `&page=${page - 1}` : '';

    return `${base}${endpoint}?query=${input}${tags}${dateRange}${hitsPerPage}${pageQuery}`;
}

function getTags(searchType: SearchType): string {
    switch (searchType) {
        case SearchType.Stories:
            return '&tags=story';

        case SearchType.Comments:
            return'&tags=comment';

        default:
            return '&tags=(story,comment)';
    }
}

function getDateRange(settings: ISettingsState): string {
    const prefix = '&numericFilters=created_at_i>';

    const generateQuery = (amount, unit) => prefix + moment().subtract(amount, unit).unix();

    switch (settings.dateRange) {
        case DateRange.LastDay:
            return generateQuery(24, 'hours');

        case DateRange.PastWeek:
            return generateQuery(7, 'days');

        case DateRange.PastMonth:
            return generateQuery(1, 'months');

        case DateRange.PastYear:
            return generateQuery(1, 'years');

        case DateRange.Custom:
            const [from, to] = [settings.from, settings.to]
                .map(time => moment(time).unix())
                .sort((a, b) => a - b);
            const ONE_DAY_IN_SECOND = 86400;
            return `${prefix}${from},created_at_i<${to + ONE_DAY_IN_SECOND}`; // Make target date inclusive

        default:
            return '';
    }
}
