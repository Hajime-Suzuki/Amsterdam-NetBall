import { GET_TEAMS } from "../actions/teams"

const initialState = {
  ids: [],
  teams: {}
}
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TEAMS:
      return {
        ids: payload.result,
        teams: payload.entities.teams,
        ...(payload.entities.members && { members: payload.entities.members })
      }

    default:
      return state
  }
}
