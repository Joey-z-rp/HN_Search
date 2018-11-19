import * as React from 'react';
import { List, Message } from 'semantic-ui-react';
import { DateRange } from '../../../types/search';
import { ISettingsState } from '../../../types/stateAndAction';

const SearchMetadata: React.FunctionComponent<ISearchMetadataProps> = ({ nbHits, settings }) => (
    nbHits !== undefined
        ? (
            <Message info>
                {nbHits === 0 ? 'No' : nbHits} results found
                <List floated="right" horizontal>
                    <List.Item>Search Type: {settings.searchType}</List.Item>
                    <List.Item>Sort Order: {settings.sortOrder}</List.Item>
                    <List.Item>
                        Date Range: {
                            settings.dateRange !== DateRange.Custom
                                ? settings.dateRange
                                : `${settings.from} To ${settings.to}`
                        }
                    </List.Item>
                    <List.Item>Hits Per Page: {settings.hitsPerPage}</List.Item>
                </List>
            </Message>
        )
        : null
);

export default SearchMetadata;

interface ISearchMetadataProps {
    nbHits?: number;
    settings: ISettingsState;
}
