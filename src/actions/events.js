import api from '../api/adapter'

export const GET_EVENTS = 'GET_EVENTS'

export const getEvents = () => {
  return function(dispatch) {
    return api.getAllEvents()
      .then(json => dispatch({
        type: GET_EVENTS,
        payload: json
      })
    )
  }
}