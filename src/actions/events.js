import api from '../api/adapter'

export const GET_EVENTS = 'GET_EVENTS'
export const GET_EVENT = 'GET_EVENT'

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

export const getEvent = (id) => {
  return function(dispatch) {
    return api.getEvent(id)
      .then(json => dispatch({
        type: GET_EVENT,
        payload: json
      })
    )
  }
}
