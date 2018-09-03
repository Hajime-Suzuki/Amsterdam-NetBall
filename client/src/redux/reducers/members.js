import { ADD_USER, UPDATE_USER, UPDATE_USERS } from "../actions/users"
import { USER_LOGOUT } from "../actions/users"
import { GET_MEMBERS, FILTER_MEMBERS, GET_MEMBER } from "../actions/members"
const initialState = {
  ids: [],
  members: {}
}
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGOUT:
      return null

    case GET_MEMBERS:
      return {
        ids: payload.result,
        members: payload.entities.members
      }

    case FILTER_MEMBERS:
      return {
        ids: payload.result || initialState.ids,
        members: payload.entities.members || initialState.members
      }

    default:
      return state
  }
}
