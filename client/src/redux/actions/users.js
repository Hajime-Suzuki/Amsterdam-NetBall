import * as request from "superagent"
import { baseUrl } from "../../constants"

export const ADD_USER = "ADD_USER"
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_USERS = "UPDATE_USERS"

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS"
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED"

export const USER_LOGOUT = "USER_LOGOUT"

export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS"
export const USER_SIGNUP_FAILED = "USER_SIGNUP_FAILED"

export const logout = () => ({
  type: USER_LOGOUT
})

const userLoginSuccess = login => ({
  type: USER_LOGIN_SUCCESS,
  payload: login
})

const userLoginFailed = error => ({
  type: USER_LOGIN_FAILED,
  payload: error || "Unknown error"
})

const userSignupFailed = error => ({
  type: USER_SIGNUP_FAILED,
  payload: error || "Unknown error"
})

const userSignupSuccess = () => ({
  type: USER_SIGNUP_SUCCESS
})

const updateUsers = users => ({
  type: UPDATE_USERS,
  payload: users
})

export const login = (email, password) => dispatch =>
  request
    .post(`${baseUrl}/logins`)
    .send({ email, password })
    .then(result => dispatch(userLoginSuccess(result.body)))
    .catch(err => {
      if (err.status === 400) {
        dispatch(userLoginFailed(err.response.body.message))
      } else if (err.status === 500) {
        dispatch(userLoginFailed(err.response.body.message))
      } else {
        console.error(err)
      }
    })

export const signup = (
  firstName,
  lastName,
  streetAddress,
  postalCode,
  city,
  birtDay,
  isCurrentMember,
  email,
  // phoneNum,
  password,
  startDate,
  endDate
) => dispatch => {
  const dateOfBirth = new Date(birtDay)

  request
    .post(`${baseUrl}/signup`)
    .send({
      firstName,
      lastName,
      streetAddress,
      postalCode,
      city,
      dateOfBirth,
      isCurrentMember,
      email,
      // phoneNum,
      password
      // startDate,
      // endDate
    })
    .then(result => {
      dispatch(userSignupSuccess())
    })
    .catch(err => {
      console.log(err.response.body)
      const msg = err.response.body.message.startsWith(
        "duplicate key value violates"
      )
        ? "Email already exists"
        : err.response.body.message ===
          `Invalid body, check 'errors' property for more info.`
          ? Object.values(err.response.body.errors[0].constraints).join(" ")
          : err.response.body.message

      dispatch(userSignupFailed(msg))
    })
}
