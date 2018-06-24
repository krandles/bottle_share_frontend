import { LOGIN, LOGOUT, CREATE_USER, FIND_USER, GET_USERS, GET_CURRENT_USER } from '../actions/users';
import { GET_EVENTS, GET_EVENT, ADD_EVENT, PATCH_EVENT } from '../actions/events';
import { GET_BEERS, GET_BEER, ADD_BEER, PATCH_BEER } from '../actions/beers';
import { GET_BREWERIES, GET_BREWERY, ADD_BREWERY, PATCH_BREWERY, MAKE_BREWERIES_LIST } from '../actions/breweries';
import { GET_POSTS, ADD_POST } from '../actions/posts';
import { GET_REVIEWS, ADD_REVIEW } from '../actions/reviews';
import { GET_INVITATIONS, ADD_INVITATION } from '../actions/invitations';

// TODO: get rid of duplicate user info in state, add new models
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
  currentEvent: {},
  users: [],
  events: [],
  breweries: [],
  beers: [],
  reviews: []
};

function rootReducer(state = initialState, action) {
  let events = [];
  let beers = [];
  let breweries = [];
  let breweriesArray = [];
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
    case GET_EVENTS:
      return {
        ...state,
        events: action.payload
      };
    case GET_EVENT:
      return {
        ...state,
        currentEvent: action.payload
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [
          ...state.events,
          action.payload
        ]
      };
    case PATCH_EVENT:
      events = state.events.filter(event => event.id !== action.payload.id);
      return {
        ...state,
        events: [
          ...events,
          action.payload
        ]
      };
    case GET_BEERS:
      return {
        ...state,
        beers: action.payload
      };
    case GET_BEER:
      return {
        ...state,
        currentBeer: action.payload
      };
    case ADD_BEER:
      if (action.payload) {
        return {
          ...state,
          beers: [
            ...state.beers,
            action.payload
          ]
        };
      }
      return state;
    case PATCH_BEER:
      beers = state.beers.filter(beer => beer.id !== action.payload.id);
      return {
        ...state,
        beers: [
          ...beers,
          action.payload
        ]
      };
    case GET_BREWERIES:
      return {
        ...state,
        breweries: action.payload
      };
    case GET_BREWERY:
      return {
        ...state,
        currentBrewery: action.payload
      };
    case ADD_BREWERY:
      return {
        ...state,
        breweries: [
          ...state.breweries,
          action.payload
        ]
      };
    case PATCH_BREWERY:
      breweries = state.breweries.filter(brewery => brewery.id !== action.payload.id);
      return {
        ...state,
        breweries: [
          ...breweries,
          action.payload
        ]
      };
    case MAKE_BREWERIES_LIST:
      breweriesArray = state.breweries.map(brewery => ({ key: brewery.id, text: brewery.name, value: brewery.id }));
      return {
        ...state,
        breweriesArray
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case ADD_POST:
      return {
        ...state,
        currentEvent: {
          ...state.currentEvent,
          posts: [
            action.payload,
            ...state.currentEvent.posts
          ]
        }
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };
    case ADD_REVIEW:
      return {
        ...state,
        currentBeer: {
          ...state.currentBeer,
          reviews: [
            action.payload,
            ...state.currentBeer.reviews
          ]
        }
      };
    case GET_INVITATIONS:
      return {
        ...state,
        invitations: action.payload
      };
    case ADD_INVITATION:
      return {
        ...state,
        currentEvent: {
          ...state.currentEvent,
          invitations: [
            ...state.currentEvent.invitations,
            action.payload
          ]
        }
      };
    default:
      return state;
  }
}

export default rootReducer;
