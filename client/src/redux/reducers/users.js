import { ADD_USER, UPDATE_USER, UPDATE_USERS } from '../actions/users'
import { USER_LOGOUT } from '../actions/users'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGOUT:
      return null

    // case ADD_USER:
    //   return {
    //     ...state,
    //     [payload.id]: payload
    //   }

    case UPDATE_USER:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_USERS:
      return {
        ...state,
        ids: payload.result,
        users: payload.entities.users
      }

    default:
      return state
  }
}
