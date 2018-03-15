import api from '../api/adapter'

export const LOGIN = "LOGIN"
export const CREATE_USER = "CREATE_USER"
export const FIND_USER = "FIND_USER"
export const LOGOUT = "LOGOUT"

export const login = (email, password) => {
  return function(dispatch) {
    return api.login(email, password)
      .then(json => dispatch({
        type: LOGIN,
        payload: json
      })
    )
  }
}

export const logout = () => {
  return { type: LOGOUT }
}

export const createUser = (user) => {
  return function(dispatch) {
    return api.createUser(user)
      .then(json => dispatch({
        type: CREATE_USER,
        payload: json
      })
    )
  }
}

export const findUser = (token) => {
  return function(dispatch) {
    return api.findUser(token)
      .then(json => dispatch({
        type: FIND_USER,
        payload: json
      })
    )
  }
}