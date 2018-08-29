import { FETCHING_MEMBERS, GET_MEMBERS } from '../actions/members'

const initialState = {
  members: false
}
export default function(state = initialState, { type, payload }) {
  switch (type) {
    case FETCHING_MEMBERS:
      return {
        ...state,
        members: true
      }
    case GET_MEMBERS:
      return {
        ...state,
        members: false
      }
    default:
      return state
  }
}
