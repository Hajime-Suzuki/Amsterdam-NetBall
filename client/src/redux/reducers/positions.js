import { GET_MEMBERS } from '../actions/members'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_MEMBERS:
      return payload.entities.positions
    default:
      return state
  }
}
