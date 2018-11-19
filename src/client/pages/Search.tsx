import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { doSearch, handleInputChangeAction } from '../actions/search';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import { IHit } from '../../types/search';
import { ISettingsState, IState } from '../../types/stateAndAction';
import SearchMetadata from './search/SearchMetadata';
import SearchBar from './search/SearchBar';
import SearchResult from './search/SearchResult';
import { settings } from 'cluster';

const mapStateToProps = (state: IState): IStateProps => ({
    error: state.search.error,
    hits: state.search.result.hits,
    isFetching: state.search.isFetching,
    nbHits: state.search.result.nbHits,
    nbPages: state.search.result.nbPages,
    page: state.search.page,
    settings: state.settings,
});

const mapDispatchToProps = (dispatch): IDispatchProps => ({
    changePage: page => dispatch(doSearch(page)),
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
            error,
            handleInputChange,
            hits,
            isFetching,
            nbHits,
            nbPages,
            page,
            search,
            settings,
        } = this.props;

        return (
            <Layout>
                <SearchBar
                    handleInputChange={handleInputChange}
                    search={search}
                />
                <SearchMetadata nbHits={nbHits} settings={settings} />
                <SearchResult
                    error={error}
                    hits={hits}
                    isFetching={isFetching}
                    nbHits={nbHits}
                />
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
    error: Error | null;
    hits: IHit[] | undefined;
    isFetching: boolean;
    nbHits: number | undefined;
    nbPages: number | undefined;
    page: number;
    settings: ISettingsState;
}

interface IDispatchProps {
    changePage: (page: number) => Promise<any>;
    handleInputChange: (input: string) => void;
    search: () => Promise<any>;
}

type IProps = IStateProps & IDispatchProps;
