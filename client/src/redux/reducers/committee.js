import { GET_COMMITTEE } from "../actions/committees"

export default (state = null, { type, payload }) => {
  switch (type) {

    case GET_COMMITTEE:
      return payload

    default:
      return state

  }
}
