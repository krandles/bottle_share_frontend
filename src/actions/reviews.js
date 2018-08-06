import api from '../api/adapter';

export const GET_REVIEWS = 'GET_REVIEWS';
export const ADD_REVIEW = 'ADD_REVIEW';

export const getReviews = () => dispatch => api.getAllReviews()
  .then(json => dispatch({
    type: GET_REVIEWS,
    payload: json
  }));

export const addReview = review => dispatch => api.postNewReview(review)
  .then(json => dispatch({
    type: ADD_REVIEW,
    payload: json
  }));
