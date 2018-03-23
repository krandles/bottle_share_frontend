import React from 'react'
import { Item } from 'semantic-ui-react'

const PostItem = (props) => {
  console.log(props)
  return (
    <Item>
      {props.post.image_url ?
        <Item.Image size="small" src={props.post.image_url} />
        :
        null
      }
      <Item.Content>
        <Item.Header>{props.author}</Item.Header>
        <Item.Description>{props.post.body}</Item.Description>
      </Item.Content>
    </Item>
  )
}

export default PostItem