import api from '../api/adapter';

export const GET_INVITATIONS = 'GET_INVITATIONS';
export const ADD_INVITATION = 'ADD_INVITATION';

export const getAllInvitations = () => dispatch => api.getAllInvitations()
  .then(json => dispatch({
    type: GET_INVITATIONS,
    payload: json
  }));

export const addInvitation = invitation => dispatch => api.postNewInvitation(invitation)
  .then(json => dispatch({
    type: ADD_INVITATION,
    payload: json
  }));
