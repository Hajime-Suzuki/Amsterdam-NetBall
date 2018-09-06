import {
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
