import React from 'react';
import { Item } from 'semantic-ui-react'
import PostItem from './PostItem'


const PostList = (props) => {
  return (
    <Item.Group>
      {props.allPosts.map(p => {
        return <PostItem key={p.id} post={p} user={props.allUsers.find(user => user.id === p.user_id)} />
      })}
    </Item.Group>
  )
}

export default PostList