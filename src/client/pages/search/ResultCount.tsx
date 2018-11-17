import * as React from 'react';
import { Message } from 'semantic-ui-react';

const ResultCount: React.FunctionComponent<ISearchBarProps> = ({ nbHits }) => (
    nbHits !== undefined
        ? (
            <Message
                content={`${nbHits === 0 ? 'No' : nbHits} results found`}
                info
            />
        )
        : null
);

export default ResultCount;

interface ISearchBarProps {
    nbHits?: number;
}
