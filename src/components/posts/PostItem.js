import React from 'react'
import { Item } from 'semantic-ui-react'

const PostItem = (props) => {
  return (
    <Item>
      <Item.Content>
        <Item.Header>{props.author}</Item.Header>
        <Item.Description>{props.post.body}</Item.Description>
      </Item.Content>
      {props.post.image_url ?
        <Item.Image size="medium" src={props.post.image_url} />
        :
        null
      }
    </Item>
  )
}

export default PostItem