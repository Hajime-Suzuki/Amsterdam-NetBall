import {
  ADD_ACTIVITY,
  GET_ACTIVITIES,
  UPDATE_ACTIVITY
} from "../actions/activities"

const initialState = {
  ids: [],
  activities: {},
  members: {},
  attendance: {}
}
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ACTIVITIES:
      return {
        ids: payload.result,
        activities: payload.entities.activities,
        ...(payload.entities.members && { members: payload.entities.members }),
        ...(payload.entities.attendance && {
          attendance: payload.entities.attendance
        })
      }
    case ADD_ACTIVITY:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_ACTIVITY: {
      return {
        ids: [...state.ids],
        activities: { ...state.activities },
        members: { ...state.members },
        attendance: { ...state.attendance, [payload.id]: payload }
      }
    }
    default:
      return state
  }
}
