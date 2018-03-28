import { LOGIN, LOGOUT, CREATE_USER, FIND_USER, GET_USERS, GET_CURRENT_USER } from '../actions/users'
import { GET_EVENTS, GET_EVENT, ADD_EVENT, PATCH_EVENT } from '../actions/events'
import { GET_POSTS, ADD_POST } from '../actions/posts'
import { GET_INVITATIONS } from '../actions/invitations'

const initialState = {
  loggedIn: false,
  userName: '',
  userID: '',
  currentUser : {
    id: null,
    name: "",
    invitations: [],
    events: [],
    hosted_events: []
  },
  users: [],
  events: []
}

const refactored = {
  loggedIn: false,
  currentUser : {
    id: null,
    name: "",
    invitations: [],
    events: []
  },
  events: [
    {
      id: null,
      title: "",
      posts: [],
      invitees: []
    }
  ],

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
        userID: '',
        currentUser: {}
      }
    case CREATE_USER:
      localStorage.setItem("token", action.payload.token)
      return { ...state,
        loggedIn: true,
        userName: action.payload.user.name,
        userID: action.payload.user.id
      }
    case FIND_USER:
      return { ...state,
        loggedIn: true,
        userName: action.payload.user.name,
        userID: action.payload.user.id
      }
    case GET_USERS:
      return { ...state,
        users: action.payload
      }
    case GET_CURRENT_USER:
      return { ...state,
        currentUser: action.payload
      }
    case GET_EVENTS:
      return { ...state,
        events: action.payload
      }
    case GET_EVENT:
      return { ...state,
        currentEvent: action.payload
      }
    case ADD_EVENT:
      return { ...state,
        events: [
          ...state.events,
          action.payload
        ]
      }
    case PATCH_EVENT:
      const events = state.events.filter(event => event.id !== action.payload.id)
      return { ...state,
        events: [
          ...events,
          action.payload
        ]
      }
    case GET_POSTS:
      return { ...state,
        posts: action.payload
      }
    case GET_INVITATIONS:
      return { ...state,
        invitations: action.payload
      }
    case ADD_POST:
      return { ...state,
        currentEvent: {
          ...state.currentEvent,
          posts: [
            action.payload,
            ...state.currentEvent.posts
          ]
        }
      }
    default:
      return state
  }
}

export default rootReducer