import { LOGIN, LOGOUT, CREATE_USER, FIND_USER, GET_USERS } from '../actions/users'
import { GET_EVENTS } from '../actions/events'
import { GET_POSTS } from '../actions/posts'
import { GET_INVITATIONS } from '../actions/invitations'

const initialState = {
  loggedIn: false,
  userName: '',
  userID: '',
  users: [],
  events: [],
  posts: [],
  invitations: []
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
      return {
        ...initialState
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
    case GET_USERS:
      return {...state,
        users: action.payload
      }
    case GET_EVENTS:
      return {...state,
        events: action.payload
      }
    case GET_POSTS:
      return {...state,
        posts: action.payload
      }
    case GET_INVITATIONS:
      return { ...state,
        invitations: action.payload
      }
    default:
      return state
  }
}

export default rootReducer