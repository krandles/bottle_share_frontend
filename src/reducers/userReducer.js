import { LOGIN, LOGOUT, CREATE_USER, FIND_USER, GET_USERS, GET_CURRENT_USER } from '../actions/users';

const initialState = {
  loggedIn: false,
  userName: '',
  userID: '',
  currentUser: {
    id: null,
    name: '',
    invitations: [],
    events: [],
    hosted_events: []
  },
  users: []
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          loggedIn: true,
          userName: action.payload.user.name,
          userID: action.payload.user.id
        };
      }
      localStorage.removeItem('token');
      return state;
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        loggedIn: false,
        userName: '',
        userID: '',
        currentUser: {}
      };
    case CREATE_USER:
      if (action.payload) {
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          loggedIn: true,
          userName: action.payload.user.name,
          userID: action.payload.user.id
        };
      }
      return state;
    case FIND_USER:
      return {
        ...state,
        loggedIn: true,
        userName: action.payload.user.name,
        userID: action.payload.user.id
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
}

export default userReducer;
