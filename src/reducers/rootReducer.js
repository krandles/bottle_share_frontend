import { LOGIN, LOGOUT, CREATE_USER, FIND_USER } from '../actions/users'

const initialState = {
  loggedIn: false,
  userName: '',
  userID: ''
}

function rootReducer(state=initialState, action) {
  switch (action.type) {
    case LOGIN:
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token)
        return {...state,
          loggedIn: true,
          userName: action.payload.user.name,
          userID: action.payload.user.id
        }
      } else {
        localStorage.removeItem("token")
        return state
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {...state,
        loggedIn: false,
        userName: '',
        userID: ''
      }
    case CREATE_USER:
      localStorage.setItem("token", action.payload.token)
      return {...state,
        loggedIn: true,
        userName: action.payload.user.name,
        userID: action.payload.user.id
      }
    case FIND_USER:
      return {...state,
        loggedIn: true,
        userName: action.payload.user.name,
        userID: action.payload.user.id
      }
    default:
      return state
  }
}

export default rootReducer