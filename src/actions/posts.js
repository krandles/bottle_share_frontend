import api from '../api/adapter'

export const GET_POSTS = "GET_POSTS"

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