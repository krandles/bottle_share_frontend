import api from '../api/adapter';

export const GET_BREWERIES = 'GET_BREWERIES';
export const GET_BREWERY = 'GET_BREWERY';
export const ADD_BREWERY = 'ADD_BREWERY';
export const PATCH_BREWERY = 'PATCH_BREWERY';

export const getBreweries = () => {
  return (dispatch) => {
    return api.getAllBreweries()
      .then(json => dispatch({
        type: GET_BREWERIES,
        payload: json
      }));
  };
};

export const getBrewery = (id) => {
  return (dispatch) => {
    return api.getBrewery(id)
      .then(json => dispatch({
        type: GET_BREWERY,
        payload: json
      }));
  };
};

export const addBrewery = (brewery) => {
  return (dispatch) => {
    return api.postNewBrewery(brewery)
      .then(json => dispatch({
        type: ADD_BREWERY,
        payload: json
      }));
  };
};

export const patchBrewery = (brewery) => {
  return (dispatch) => {
    return api.patchBrewery(brewery)
      .then(json => dispatch({
        type: PATCH_BREWERY,
        payload: json
      }));
  };
};
