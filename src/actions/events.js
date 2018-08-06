import api from '../api/adapter';

export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENT = 'GET_EVENT';
export const ADD_EVENT = 'ADD_EVENT';
export const PATCH_EVENT = 'PATCH_EVENT';
export const CLEAR_CURRENT_EVENT = 'CLEAR_CURRENT_EVENT';

export const getEvents = () => dispatch => api.getAllEvents()
  .then(json => dispatch({
    type: GET_EVENTS,
    payload: json
  }));

export const getEvent = id => dispatch => api.getEvent(id)
  .then(json => dispatch({
    type: GET_EVENT,
    payload: json
  }));

export const addEvent = event => dispatch => api.postNewEvent(event)
  .then(json => dispatch({
    type: ADD_EVENT,
    payload: json
  }));

export const patchEvent = event => dispatch => api.patchEvent(event)
  .then(json => dispatch({
    type: PATCH_EVENT,
    payload: json
  }));

export const clearCurrentEvent = () => (dispatch) => {
  dispatch({ type: CLEAR_CURRENT_EVENT });
};
