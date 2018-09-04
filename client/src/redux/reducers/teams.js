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
        teams: payload.entities.teams
      }

    default:
      return state
  }
}
