import {
  GET_ALL_COMMITTEES,
  ADD_COMMITTEE,
  DELETE_COMMITTEE
} from "../actions/committees"

export default (state = [], { type, payload }) => {
  switch (type) {
    case GET_ALL_COMMITTEES:
      return payload

    case ADD_COMMITTEE:
      return [...state, payload]

    case DELETE_COMMITTEE:
      const remainingCommittees = state.filter(
        committee => committee.id !== payload
      )
      return remainingCommittees

    default:
      return state
  }
}
