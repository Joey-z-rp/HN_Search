import * as moment from 'moment';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Icon, Item, Label } from 'semantic-ui-react';

import { IHit } from '../../../types/search';
import * as s from './hit/Hit.css';

const Hit: React.FunctionComponent<{ data: IHit }> = ({ data }) => (
    <Item>
        <Item.Content>
            <Item.Header
                as={data.url || data.story_url ? 'a' : null}
                href={data.url || data.story_url}
            >
                {data.title || data.story_title || 'Title not found'}
            </Item.Header>
            <MediaQuery maxWidth={768}>
                {(matches) => {
                    const size = matches ? 'mini' : 'medium';
                    return (
                        <Item.Meta>
                            <Label size={size}>
                                {data.points || 0} points
                            </Label>
                            <Label size={size}>
                                <Icon name="user" /> {data.author}
                            </Label>
                            <Label size={size}>
                                {moment(data.created_at).fromNow()}
                            </Label>
                            <Label size={size}>
                                {data.num_comments ? `${data.num_comments} comments` : 'comment'}
                            </Label>
                            {
                                data.url && !matches
                                    ? (
                                        <Label
                                            as="a"
                                            className={s.marginTop}
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
                {
                    data.comment_text
                        ? <div dangerouslySetInnerHTML={{ __html: data.comment_text }} /> // Assume the comment text is sanitised
                        : null
                }
            </Item.Description>
        </Item.Content>
    </Item>
);

export default Hit;
