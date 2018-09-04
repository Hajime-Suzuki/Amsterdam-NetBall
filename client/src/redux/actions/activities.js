import { createSelector } from "reselect"
import { normalize, schema } from "normalizr"
import { isExpired } from "../../jwt"
import { logout } from "./users"
import * as request from "superagent"
import { baseUrl } from "../../constants"

export const GET_ACTIVITIES = "GET_ACTIVITIES"
export const ADD_ACTIVITY = "ADD_ACTIVITY"

const activity = new schema.Entity("activities")

const setActivities = data => ({
  type: GET_ACTIVITIES,
  payload: normalize(data, [activity])
})

const addActivity = data => ({
  type: ADD_ACTIVITY,
  payload: normalize(data, [activity])
})

export const getActivities = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/activities`)
    .set("Authorization", `${jwt}`)
    .then(result => {
      dispatch(setActivities(result.body))
    })
    .catch(err => console.error(err))
}

export const createActivity = data => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/admin/activity`)
    .set("Authorization", `${jwt}`)
    .send(data)
    .then(result => {
      dispatch(addActivity(result.body))
    })
    .catch(err => console.error(err))
}
