import api from '../api/adapter'

export const GET_POSTS = "GET_POSTS"
export const ADD_POST = 'ADD_POST'

export const getAllPosts = () => {
  return function(dispatch) {
    return api.getAllPosts()
      .then(json => dispatch({
        type: GET_POSTS,
        payload: json
      })
    )
  }
}

export const addPost = (post) => {
  return function(dispatch) {
    return api.postNewPost(post)
      .then(json => dispatch({
        type: ADD_POST,
        payload: json
      }))
  }
}