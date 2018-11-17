import * as React from 'react';
import { Button, Input } from 'semantic-ui-react';

const SearchBar: React.FunctionComponent<ISearchBarProps> = ({
    handleInputChange,
    search,
}) => (
    <Input
        action={
            <Button
                color="teal"
                content="Search"
                onClick={() => search()}
            />
        }
        fluid
        icon="search"
        iconPosition="left"
        onChange={(event, data) => handleInputChange(data.value)}
        placeholder="Search..."
    />
);

export default SearchBar;

interface ISearchBarProps {
    handleInputChange: (input: string) => void;
    search: () => Promise<any>;
}
