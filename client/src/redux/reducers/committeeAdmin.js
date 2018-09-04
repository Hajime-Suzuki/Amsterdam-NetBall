import { GET_ALL_COMMITTEES, ADD_COMMITTEE } from "../actions/committees"

export default (state = [], { type, payload }) => {
  switch (type) {

    case GET_ALL_COMMITTEES:
      console.log('payload', payload)
      return payload

    case ADD_COMMITTEE:
      return [...state, payload ]

    default:
      return state

  }
}
