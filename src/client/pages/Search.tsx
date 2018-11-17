import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Item,
    Message,
    Segment,
} from 'semantic-ui-react';

import {
    doSearch,
    handleInputChangeAction,
    handlePageChange,
} from '../actions/search';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import Placeholder from '../components/Placeholder';
import { IHit } from '../../types/search';
import { IState } from '../../types/stateAndAction';
import Hit from './search/Hit';
import SearchBar from './search/SearchBar';

const mapStateToProps = (state: IState): IStateProps => ({
    hits: state.search.result.hits,
    isFetching: state.search.isFetching,
    nbHits: state.search.result.nbHits,
    nbPages: state.search.result.nbPages,
    page: state.search.page,
});

const mapDispatchToProps = (dispatch): IDispatchProps => ({
    changePage: page => dispatch(handlePageChange(page)),
    handleInputChange: input => dispatch(handleInputChangeAction(input)),
    search: () => dispatch(doSearch()),
});

class Search extends React.Component<IProps> {
    componentDidMount() {
        this.props.search();
    }

    render() {
        const {
            changePage,
            handleInputChange,
            hits,
            isFetching,
            nbHits,
            nbPages,
            page,
            search,
        } = this.props;

        const resultCount = () => nbHits !== undefined
            ? <Message content={`${nbHits} results found`} info />
            : null;

        return (
            <Layout>
                <SearchBar
                    handleInputChange={handleInputChange}
                    search={search}
                />
                {resultCount()}
                <Segment loading={isFetching}>
                    {isFetching ? <Placeholder /> : null}
                    <Item.Group divided>
                        {(hits || []).map(hit => <Hit key={hit.objectID} data={hit} />)}
                    </Item.Group>
                </Segment>
                <Pagination
                    handlePageChange={changePage}
                    nbPages={nbPages}
                    page={page}
                />
            </Layout>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));

interface IStateProps {
    hits: IHit[] | undefined;
    isFetching: boolean;
    nbHits: number | undefined;
    nbPages: number | undefined;
    page: number;
}

interface IDispatchProps {
    changePage: (page: number | string | undefined) => Promise<any>;
    handleInputChange: (input: string) => void;
    search: () => Promise<any>;
}

type IProps = IStateProps & IDispatchProps;
