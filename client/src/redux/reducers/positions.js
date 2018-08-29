import { UPDATE_USERS } from '../actions/users'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_USERS:
      return payload.entities.positions
    default:
      return state
  }
}
