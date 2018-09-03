import { GET_ACTIVITIES } from "../actions/activities"

const initialState = {
  ids: [],
  activities: {}
}
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ACTIVITIES:
      return {
        ids: payload.result,
        activities: payload.entities.activities
      }

    default:
      return state
  }
}
