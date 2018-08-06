import api from '../api/adapter';

export const GET_BEERS = 'GET_BEERS';
export const GET_BEER = 'GET_BEER';
export const ADD_BEER = 'ADD_BEER';
export const PATCH_BEER = 'PATCH_BEER';
export const MAKE_BEERS_LIST = 'MAKE_BEERS_LIST';
export const CLEAR_CURRENT_BEER = 'CLEAR_CURRENT_BEER';

export const getBeers = () => dispatch => api.getAllBeers()
  .then(json => dispatch({
    type: GET_BEERS,
    payload: json
  }));

export const getBeer = id => dispatch => api.getBeer(id)
  .then(json => dispatch({
    type: GET_BEER,
    payload: json
  }));

export const addBeer = beer => dispatch => api.postNewBeer(beer)
  .then(json => dispatch({
    type: ADD_BEER,
    payload: json
  }));

export const patchBeer = beer => dispatch => api.patchBeer(beer)
  .then(json => dispatch({
    type: PATCH_BEER,
    payload: json
  }));

export const makeBeersList = () => (dispatch) => {
  dispatch({ type: MAKE_BEERS_LIST });
};

export const clearCurrentBeer = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_BEER });
};
