import { GET_BEERS, GET_BEER, ADD_BEER, PATCH_BEER, MAKE_BEERS_LIST, CLEAR_CURRENT_BEER } from '../actions/beers';
import { GET_BREWERIES, GET_BREWERY, ADD_BREWERY, PATCH_BREWERY, MAKE_BREWERIES_LIST } from '../actions/breweries';
import { GET_REVIEWS, ADD_REVIEW } from '../actions/reviews';

const initialState = {
  currentBeer: {},
  breweries: [],
  beers: [],
  reviews: []
};

function beerReducer(state = initialState, action) {
  let beers = [];
  let beersArray = [];
  let breweries = [];
  let breweriesArray = [];
  switch (action.type) {
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
    case CLEAR_CURRENT_BEER:
      return {
        ...state,
        currentBeer: {}
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
    case MAKE_BEERS_LIST:
      beersArray = state.beers.map(beer => ({
        key: beer.id,
        text: beer.name,
        value: beer.id
      }));
      return {
        ...state,
        beersArray
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
      breweriesArray = state.breweries.map(brewery => ({
        key: brewery.id,
        text: brewery.name,
        value: brewery.id
      }));
      return {
        ...state,
        breweriesArray
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [
          action.payload,
          ...state.reviews
        ]
      };
    default:
      return state;
  }
}

export default beerReducer;
