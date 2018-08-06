import api from '../api/adapter';

export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';

export const getAllPosts = () => dispatch => api.getAllPosts()
  .then(json => dispatch({
    type: GET_POSTS,
    payload: json
  }));

export const addPost = post => dispatch => api.postNewPost(post)
  .then(json => dispatch({
    type: ADD_POST,
    payload: json
  }));
