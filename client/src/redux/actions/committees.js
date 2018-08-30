import { isExpired } from "../../jwt"
import { logout } from "./users"
import * as request from "superagent"
import { baseUrl } from "../../constants"

export const GET_COMMITTEE = "GET_COMMITTEE"
export const ADD_MESSAGE = "ADD_MESSAGE"

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

export const addMessage = (messageBody, committeeId) => (dispatch, getState) => {

  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/committees/${committeeId}`)
    .set("Authorization", `${jwt}`)
    .send(messageBody)
    .then(result => {
      console.log('result', result)
      dispatch({
        type: ADD_MESSAGE,
        payload: result.body
      })
    })
    .catch(err => alert(err))

}
