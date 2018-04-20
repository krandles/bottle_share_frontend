import api from '../api/adapter';

export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENT = 'GET_EVENT';
export const ADD_EVENT = 'ADD_EVENT';
export const PATCH_EVENT = 'PATCH_EVENT';


export const getEvents = () => {
  return (dispatch) => {
    return api.getAllEvents()
      .then(json => dispatch({
        type: GET_EVENTS,
        payload: json
      }));
  };
};

export const getEvent = (id) => {
  return (dispatch) => {
    return api.getEvent(id)
      .then(json => dispatch({
        type: GET_EVENT,
        payload: json
      }));
  };
};

export const addEvent = (event) => {
  return (dispatch) => {
    return api.postNewEvent(event)
      .then(json => dispatch({
        type: ADD_EVENT,
        payload: json
      }));
  };
};

export const patchEvent = (event) => {
  return (dispatch) => {
    return api.patchEvent(event)
      .then(json => dispatch({
        type: PATCH_EVENT,
        payload: json
      }));
  };
};
