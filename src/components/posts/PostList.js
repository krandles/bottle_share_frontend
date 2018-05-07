import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';
import PostItem from './PostItem';

const PostList = props => (
  <Item.Group>
    {props.allPosts.map(p => <PostItem key={p.id} post={p} author={p.author} />)}
  </Item.Group>
);

PostList.propTypes = {
  allPosts: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default PostList;
