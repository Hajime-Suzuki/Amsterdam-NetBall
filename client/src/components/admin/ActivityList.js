import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import { Typography, Icon, Checkbox } from '@material-ui/core'
import styled from 'styled-components'
import { StyledNameLink } from '../members/MembersListComponent'

const ActivityCard = styled(Paper)`
  margin: 2em 0;
`

const formatTiem = time => {
  return time.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2}).*/, '$4 $3/$2')
}

const ActivityList = ({ activities, attendances, changeAttendance }) => {
  if (!activities.length) return null

  return activities.map(act => {
    // console.log('===', act)
    const members = act.members ? (
      act.members.map(m => {
        const thisAttendance =
          Object.values(attendances).find(
            att => att.memberId === m.id && att.activityId === act.id
          ) || {}

        return (
          <div key={m.id}>
            <Checkbox
              checked={thisAttendance.isAttended}
              color="primary"
              onChange={() => changeAttendance(thisAttendance.id)}
            />
            <StyledNameLink to={`/members/${m.id}`}>
              {m.firstName} {m.lastName}
            </StyledNameLink>
          </div>
        )
      })
    ) : (
      <Typography>No member</Typography>
    )

    return (
      <ActivityCard key={act.id}>
        <Typography variant="display1">{act.name}</Typography>
        <Typography>
          <Icon className="fas fa-clock" />
          {formatTiem(act.startTime)} - {formatTiem(act.endTime)}
        </Typography>
        <Typography>
          <Icon className="fas fa-map-marker-alt" />
          {act.location}
        </Typography>
        {members}
      </ActivityCard>
    )
  })
}

export default ActivityList
