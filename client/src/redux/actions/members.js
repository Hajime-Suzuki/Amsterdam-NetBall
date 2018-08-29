import { createSelector } from 'reselect'
import { normalize, schema } from 'normalizr'
import { isExpired } from '../../jwt'
import { logout } from './users'
import * as request from 'superagent'
import { baseUrl } from '../../constants'

export const GET_MEMBERS = 'GET_MEMBERS'
export const FETCHING_MEMBERS = 'FETCHING_MEMBERS'
export const FILTER_MEMBERS = 'FILTER_MEMBERS'

const position = new schema.Entity('positions')
const acitivity = new schema.Entity('activities')
const member = new schema.Entity('members', {
  activities: [acitivity],
  positions: [position]
})

const setMembers = data => ({
  type: GET_MEMBERS,
  payload: normalize(data, [member])
})
const filterAndSetMembers = data => ({
  type: FILTER_MEMBERS,
  payload: normalize(data, [member])
})

export const getMembers = () => (dispatch, getState) => {
  dispatch({ type: FETCHING_MEMBERS })

  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/members`)
    .set('Authorization', `${jwt}`)
    .then(result => dispatch(setMembers(result.body)))
    .catch(err => console.error(err))
}

const memberSelector = state => state.members.members
const memberIdSelector = state => state.members.ids
const positionSelector = state => state.positions
const currentUserIdSelector = state => state.currentUser && state.currentUser.id

export const allMemberInfoSelector = createSelector(
  [memberSelector, memberIdSelector, currentUserIdSelector, positionSelector],
  (members, ids, currentUserId, positions) => {
    // if (!ids || !members || !currentUserId) return []
    return ids.filter(id => id !== currentUserId).map(id => {
      return {
        ...members[id],
        positions: members[id].positions.map(
          posId => positions[posId].positionName
        )
      }
    })
  }
)

export const searchUsers = data => (dispatch, getState) => {
  console.log('Search user action')

  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/members`)
    .query(data)
    .set('Authorization', `${jwt}`)
    .then(result => {
      dispatch(filterAndSetMembers(result.body))
    })
    .catch(err => console.error(err))
}