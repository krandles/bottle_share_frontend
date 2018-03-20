import api from '../api/adapter'

export const GET_INVITATIONS = 'GET_INVITATIONS'

export const getAllInvitations = () => {
  return function(dispatch) {
    return api.getAllInvitations()
      .then(json => dispatch({
        type: GET_INVITATIONS,
        payload: json
      })
    )
  }
}