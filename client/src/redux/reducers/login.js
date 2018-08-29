import { USER_LOGIN_FAILED, USER_LOGIN_SUCCESS } from "../actions/users"
import { userId } from "../../jwt"

export default function(state = {}, { type, payload }) {
  switch (type) {
    case USER_LOGIN_FAILED:
      return {
        error: payload
      }
    default:
      return state
  }
}
