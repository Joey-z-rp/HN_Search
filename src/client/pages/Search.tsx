import * as React from 'react';
import Layout from '../components/Layout';
import {Input, Segment, Item, Pagination, Container, Button, Message, Label, Icon, Placeholder} from "semantic-ui-react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as moment from 'moment';
import { doSearch, handleInputChangeAction, handlePageChangeAction } from '../actions/search';
import { IState } from "../../types/state";
import {IHit} from "../../types/search";
import MediaQuery from 'react-responsive';


const mapStateToProps = (state: IState): IStateProps => ({
    isFetching: state.search.isFetching,
    page: state.search.page,
    nbHits: state.search.result.nbHits,
    nbPages: state.search.result.nbPages,
    hits: state.search.result.hits,
});

const mapDispatchToProps = (dispatch):IDispatchProps => ({
    search: () => dispatch(doSearch()),
    handleInputChange: input => dispatch(handleInputChangeAction(input)),
    handlePageChange: page => dispatch(handlePageChangeAction(page)),
});

class Search extends React.Component<IProps, IComponentState> {

    componentDidMount() {
        this.props.search();
    }

    render() {
        const {
            search,
            handleInputChange,
            handlePageChange,
            page,
            nbHits,
            nbPages,
            hits,
            isFetching,
        } = this.props;

        const resultCount = () => nbHits !== undefined
            ? (<Message info content={`${nbHits} results found`} />)
            : null;

        const pagination = () => nbPages
            ? (<Container textAlign="center">
                    <Pagination
                        activePage={page}
                        totalPages={nbPages}
                        size="mini"
                        onPageChange={(event, data) => handlePageChange(data.activePage)}
                    />
                </Container>)
            : null;

        const createItem = (data: IHit) => (
            <Item>
                <Item.Content>
                    <Item.Header as={data.url ? 'a' : null} href={data.url}>{data.title}</Item.Header>
                    <MediaQuery minWidth={768}>
                        {(matches) => {
                            const size = matches ? 'medium' : 'mini';
                            return (
                                <Item.Meta>
                                    <Label size={size}>{data.points} points</Label>
                                    <Label size={size}><Icon name="user" /> {data.author}</Label>
                                    <Label size={size}>{moment(data.created_at).fromNow()}</Label>
                                    <Label size={size}>{data.num_comments} comments</Label>
                                    {
                                        data.url && matches
                                            ? (<Label size={size} as="a" href={data.url}>({data.url})</Label>)
                                            : null
                                    }
                                </Item.Meta>
                            );
                        }}
                    </MediaQuery>
                    <Item.Description>
                        {data.comment_text}
                    </Item.Description>
                </Item.Content>
            </Item>
        );

        return (
            <Layout>
                <Input
                    fluid
                    action={<Button color='teal' content='Search' onClick={() => search()} />}
                    placeholder='Search...'
                    icon='search'
                    iconPosition='left'
                    onChange={(event, data) => handleInputChange(data.value)}
                />
                {resultCount()}
                <Segment loading={isFetching}>
                    {
                        isFetching
                            ? (
                                <Placeholder>
                                    <Placeholder.Header>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder.Header>
                                    <Placeholder.Paragraph>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder.Paragraph>
                                </Placeholder>
                            )
                            : null
                    }
                    <Item.Group divided>
                        {(hits || []).map(hit => createItem(hit))}
                    </Item.Group>
                </Segment>
                {pagination()}
            </Layout>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));

interface IStateProps {
    isFetching: boolean;
    page: number;
    nbHits: number | undefined;
    nbPages: number | undefined;
    hits: IHit[] | undefined;
}

interface IDispatchProps {
    search: () => Promise<any>;
    handleInputChange: (input: string) => void;
    handlePageChange: (page: number | string | undefined) => void;
}

interface IComponentState {

}

type IProps = IStateProps & IDispatchProps;