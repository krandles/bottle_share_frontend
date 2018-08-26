import { GET_EVENTS, GET_EVENT, ADD_EVENT, PATCH_EVENT, CLEAR_CURRENT_EVENT } from '../actions/events';
import { GET_POSTS, ADD_POST } from '../actions/posts';
import { GET_INVITATIONS, ADD_INVITATION } from '../actions/invitations';

const initialState = {
  currentEvent: {},
  events: [],
};

function eventReducer(state = initialState, action) {
  let events = [];
  switch (action.type) {
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
    case CLEAR_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: {}
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

export default eventReducer;
