import { isExpired } from "../../jwt"
import { logout } from "./users"
import * as request from "superagent"
import { baseUrl } from "../../constants"

export const GET_ALL_COMMITTEES = "GET_ALL_COMMITTEES"
export const ADD_COMMITTEE = "ADD_COMMITTEE"
export const DELETE_COMMITTEE = "DELETE_COMMITTEE"
export const GET_COMMITTEE = "GET_COMMITTEE"
export const ADD_MESSAGE = "ADD_MESSAGE"
export const EDIT_MESSAGE = "EDIT_MESSAGE"
export const DELETE_MESSAGE = "DELETE_MESSAGE"

export const getAllCommittees = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/allcommittees/`)
    .set("Authorization", `${jwt}`)
    .then(result => {
      console.log('result', result)
      dispatch({
        type: GET_ALL_COMMITTEES,
        payload: result.body
      })
    })
    .catch(err => console.error(err))
}

export const addCommittee = committeeData => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  console.log('committeeData', committeeData)
  committeeData.description = 'a committee'

  request
    .post(`${baseUrl}/committees/`)
    .set("Authorization", `${jwt}`)
    .send(committeeData)
    .then(result => {
      dispatch({
        type: ADD_COMMITTEE,
        payload: result.body
      })
    })
    .catch(err => alert(err))
}

export const deleteCommittee = committeeId => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  request
    .delete(`${baseUrl}/committees/${committeeId}/`)
    .set("Authorization", `${jwt}`)
    .then(result => {
      dispatch({
        type: DELETE_COMMITTEE,
        payload: committeeId
      })
    })
    .catch(err => alert(err))
}

export const getCommittee = committeeId => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/committees/${committeeId}`)
    .set("Authorization", `${jwt}`)
    .then(result => {
      dispatch({
        type: GET_COMMITTEE,
        payload: result.body
      })
    })
    .catch(err => console.error(err))
}

export const addMessage = (messageBody, committeeId) => (
  dispatch,
  getState
) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/committees/${committeeId}`)
    .set("Authorization", `${jwt}`)
    .send(messageBody)
    .then(result => {
      dispatch({
        type: ADD_MESSAGE,
        payload: result.body
      })
    })
    .catch(err => alert(err))
}

export const editMessage = (updates, committeeId, messageId) => (
  dispatch,
  getState
) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  request
    .put(`${baseUrl}/messages/${committeeId}/${messageId}`)
    .set("Authorization", `${jwt}`)
    .send(updates)
    .then(response => {
      dispatch({
        type: EDIT_MESSAGE,
        payload: response.body
      })
    })
    .catch(err => alert(err))
}

export const deleteMessage = (committeeId, messageId) => (
  dispatch,
  getState
) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  request
    .delete(`${baseUrl}/committees/${committeeId}/${messageId}`)
    .set("Authorization", `${jwt}`)
    .then(result => {
      dispatch({
        type: DELETE_MESSAGE,
        payload: messageId
      })
    })
    .catch(err => alert(err))
}
