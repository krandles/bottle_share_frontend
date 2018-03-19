import React from 'react'
import { Item } from 'semantic-ui-react'

const PostItem = (props) => {
  console.log(props)
  return (
    <Item>
      <Item.Content>
        <Item.Header>{props.user.name}</Item.Header>
        <Item.Description>{props.post.body}</Item.Description>
      </Item.Content>
    </Item>
  )
}

export default PostItem