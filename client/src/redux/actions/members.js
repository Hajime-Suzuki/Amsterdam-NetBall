import { createSelector } from 'reselect'
import { normalize, schema } from 'normalizr'
import { isExpired } from '../../jwt'
import { logout } from './users'
import * as request from 'superagent'
import { baseUrl } from '../../constants'

export const GET_MEMBERS = 'GET_MEMBERS'

const position = new schema.Entity('positions')
const acitivity = new schema.Entity('activities')
const member = new schema.Entity('members', {
  activities: [acitivity],
  positions: [position]
})

export const getMembers = () => (dispatch, getState) => {
  const state = getState()

  if (!state.currentUser) return null
  const jwt = state.currentUser.token

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/members`)
    .set('Authorization', `${jwt}`)
    .then(result => {
      const data = normalize(result.body, [member])
      dispatch({
        type: GET_MEMBERS,
        payload: data
      })
    })
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
