import { GET_FILTER_OPTION } from '../actions/filterOption'
export default function(state = {}, { type, payload }) {
  switch (type) {
    case GET_FILTER_OPTION:
      return {
        ...payload
      }
    default:
      return state
  }
}
