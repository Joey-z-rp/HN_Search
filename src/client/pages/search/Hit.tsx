import * as moment from 'moment';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Icon, Item, Label } from 'semantic-ui-react';

import { IHit } from '../../../types/search';

const Hit: React.FunctionComponent<{ data: IHit }> = ({ data }) => (
    <Item>
        <Item.Content>
            <Item.Header
                as={data.url ? 'a' : null}
                href={data.url}
            >
                {data.title}
            </Item.Header>
            <MediaQuery maxWidth={768}>
                {(matches) => {
                    const size = matches ? 'mini' : 'medium';
                    return (
                        <Item.Meta>
                            <Label size={size}>
                                {data.points} points
                            </Label>
                            <Label size={size}>
                                <Icon name="user" /> {data.author}
                            </Label>
                            <Label size={size}>
                                {moment(data.created_at).fromNow()}
                            </Label>
                            <Label size={size}>
                                {data.num_comments} comments
                            </Label>
                            {
                                data.url && !matches
                                    ? (
                                        <Label
                                            as="a"
                                            href={data.url}
                                            size={size}
                                        >
                                            ({data.url})
                                        </Label>
                                    )
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

export default Hit;
