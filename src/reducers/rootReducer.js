import { LOGIN } from '../actions/users'

const initialState = {

}

function rootReducer(state=initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state
    default:
      return state
  }
}

export default rootReducer