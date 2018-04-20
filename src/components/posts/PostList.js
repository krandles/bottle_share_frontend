import React from 'react';
import { Item } from 'semantic-ui-react';
import PostItem from './PostItem';

const PostList = props => (
  <Item.Group>
    {props.allPosts.map(p => <PostItem key={p.id} post={p} author={p.author} />)}
  </Item.Group>
);

export default PostList;
