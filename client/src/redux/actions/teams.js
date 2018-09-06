import { createSelector } from "reselect"
import { normalize, schema } from "normalizr"
import { isExpired } from "../../jwt"
import { logout } from "./users"
import * as request from "superagent"
import { baseUrl } from "../../constants"

export const GET_TEAMS = "GET_TEAMS"

const team = new schema.Entity("teams")

const setTeams = data => ({
  type: GET_TEAMS,
  payload: normalize(data, [team])
})

export const getTeams = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/teams`)
    .set("Authorization", `${jwt}`)
    .then(result => {
      console.log(result)
      dispatch(setTeams(result.body))
    })
    .catch(err => console.error(err))
}
