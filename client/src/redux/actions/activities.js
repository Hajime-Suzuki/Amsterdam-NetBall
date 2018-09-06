import { createSelector } from "reselect"
import { normalize, schema } from "normalizr"
import { isExpired } from "../../jwt"
import { logout } from "./users"
import * as request from "superagent"
import { baseUrl } from "../../constants"

export const GET_ACTIVITIES = "GET_ACTIVITIES"
export const ADD_ACTIVITY = "ADD_ACTIVITY"
export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY"

const activity = new schema.Entity("activities")

const isAttended = new schema.Entity("attendance")
const members = new schema.Entity("members", {
  isAttended: [isAttended]
})
const activityWithMember = new schema.Entity("activities", {
  members: [members]
})

const setActivities = data => ({
  type: GET_ACTIVITIES,
  payload: normalize(data, [activity])
})

const setActivitiesWithMembers = data => ({
  type: GET_ACTIVITIES,
  payload: normalize(data, [activityWithMember])
})

const addActivity = data => ({
  type: ADD_ACTIVITY,
  payload: normalize(data, [activity])
})

const authCheckAndGetJWT = (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token
  if (isExpired(jwt)) return dispatch(logout())
  return jwt
}

export const getActivities = () => (dispatch, getState) => {
  const jwt = authCheckAndGetJWT(dispatch, getState)

  request
    .get(`${baseUrl}/activities`)
    .set("Authorization", `${jwt}`)
    .then(result => {
      dispatch(setActivities(result.body))
    })
    .catch(err => console.error(err))
}

export const getActivitiesAndMembers = () => async (dispatch, getState) => {
  const jwt = authCheckAndGetJWT(dispatch, getState)

  request
    .get(`${baseUrl}/admin/activity/members`)
    .set("Authorization", `${jwt}`)
    .then(result => {
      // console.log(result.body)
      dispatch(setActivitiesWithMembers(result.body))
    })
    .catch(err => console.error(err))
}

export const createActivity = data => (dispatch, getState) => {
  const jwt = authCheckAndGetJWT(dispatch, getState)

  request
    .post(`${baseUrl}/admin/activity`)
    .set("Authorization", `${jwt}`)
    .send(data)
    .then(result => {
      dispatch(addActivity(result.body))
    })
    .catch(err => console.error(err))
}

export const editAttendance = id => (dispatch, getState) => {
  const jwt = authCheckAndGetJWT(dispatch, getState)
  request
    .patch(`${baseUrl}/admin/activity/attendance/${id}`)
    .set("Authorization", `${jwt}`)
    .then(result => {
      dispatch({
        type: UPDATE_ACTIVITY,
        payload: result.body
      })
    })
    .catch(err => console.error(err))
}

const activitiesSelector = state =>
  state.activities && state.activities.activities
const idsSelector = state => state.activities && state.activities.ids
const membersSelector = state => state.activities && state.activities.members

export const activitiesArraySelector = createSelector(
  [activitiesSelector, idsSelector, membersSelector],
  (acts = {}, ids = [], members = []) => {
    return ids.map(id => ({
      ...acts[id],
      members:
        acts[id].members && acts[id].members.map(memberId => members[memberId])
    }))
  }
)
