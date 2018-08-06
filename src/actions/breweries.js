import api from '../api/adapter';

export const GET_BREWERIES = 'GET_BREWERIES';
export const GET_BREWERY = 'GET_BREWERY';
export const ADD_BREWERY = 'ADD_BREWERY';
export const PATCH_BREWERY = 'PATCH_BREWERY';
export const MAKE_BREWERIES_LIST = 'MAKE_BREWERIES_LIST';

export const getBreweries = () => dispatch => api.getAllBreweries()
  .then(json => dispatch({
    type: GET_BREWERIES,
    payload: json
  }));

export const getBrewery = id => dispatch => api.getBrewery(id)
  .then(json => dispatch({
    type: GET_BREWERY,
    payload: json
  }));

export const addBrewery = brewery => dispatch => api.postNewBrewery(brewery)
  .then(json => dispatch({
    type: ADD_BREWERY,
    payload: json
  }));

export const patchBrewery = brewery => dispatch => api.patchBrewery(brewery)
  .then(json => dispatch({
    type: PATCH_BREWERY,
    payload: json
  }));

export const makeBreweriesList = () => (dispatch) => {
  dispatch({ type: MAKE_BREWERIES_LIST });
};
