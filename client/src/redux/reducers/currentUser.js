import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../actions/users'
import { localStorageJwtKey } from '../constants'
import { userId, userRole } from '../jwt'

let initialState = null
try {
  const jwt = localStorage.getItem(localStorageJwtKey)
  if (jwt) {
    initialState = {
      token: jwt,
      id: userId(jwt),
      role: userRole(jwt)
    }
  }
} catch (e) {
  console.log(`Error retrieving data from local storage`, e)
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case USER_LOGIN_SUCCESS:
      return {
        token: payload.jwt,
        id: userId(payload.jwt),
        role: userRole(payload.jwt)
      }

    case USER_LOGOUT:
      return null

    default:
      return state
  }
}
