import { GET_ACTIVITIES, ADD_ACTIVITY } from "../actions/activities"

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
    case ADD_ACTIVITY:
      return {
        ...state,
        [payload.id]: payload
      }

    default:
      return state
  }
}
