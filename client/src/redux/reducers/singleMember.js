import { ADD_USER, UPDATE_USER, UPDATE_USERS } from "../actions/users"
import { USER_LOGOUT } from "../actions/users"
import {
  GET_MEMBERS,
  FILTER_MEMBERS,
  GET_MEMBER,
  EDIT_MEMBER
} from "../actions/members"

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_MEMBER:
      return {
        member: payload
      }
    case EDIT_MEMBER:
      return {
        member: payload
      }
    default:
      return state
  }
}
