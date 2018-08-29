import { ADD_USER, UPDATE_USER, UPDATE_USERS } from '../actions/users'
import { USER_LOGOUT } from '../actions/users'
import { GET_MEMBERS } from '../actions/members'
const initialState = {
  ids: [],
  members: {}
}
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGOUT:
      return null

    case UPDATE_USER:
      return {
        ...state,
        [payload.id]: payload
      }

    case GET_MEMBERS:
      return {
        ...state,
        ids: payload.result,
        members: payload.entities.members
      }

    default:
      return state
  }
}
