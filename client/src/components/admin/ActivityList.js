<<<<<<< HEAD
import React from "react"
import { Link } from "react-router-dom"
import { Typography, Icon, Checkbox } from "@material-ui/core"
=======
import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Typography, Icon, Checkbox } from '@material-ui/core'
import styled from 'styled-components'
import { StyledNameLink } from '../members/MembersListComponent'

const ActivityCard = styled(Paper)`
  margin: 2em 0;
`
>>>>>>> 66481f43c652b5b7cb21cb9764236355cb5240d9

const formatTiem = time => {
  return time.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2}).*/, "$4 $3/$2")
}

const ActivityList = ({ activities, attendances, changeAttendance }) => {
  if (!activities.length) return null

  return activities.map(act => {
    const members = act.members ? (
      act.members.map(m => {
        const thisAttendance =
          Object.values(attendances).find(
            att => att.memberId === m.id && att.activityId === act.id
          ) || {}

        return (
          <div className="mb-2" key={m.id}>
            <Checkbox
              checked={thisAttendance.isAttended}
              color="#d3d3d3"
              onChange={() => changeAttendance(thisAttendance.id)}
            />
            <p style={{ display: "inline" }}>
              <Link to={`/members/${m.id}`}>
                {m.firstName} {m.lastName}
              </Link>
            </p>
          </div>
        )
      })
    ) : (
      <Typography>No member</Typography>
    )

    return (
      <div className="mb-4">
        <h3
          className="list-group-item list-group-item-action waves-effect "
          style={{ backgroundColor: "#fff" }}
        >
          {act.name}
        </h3>
        <p className="list-group-item list-group-item-action waves-effect">
          {" "}
          <Icon className="fa fa-clock-o" /> {formatTiem(act.startTime)} -{" "}
          {formatTiem(act.endTime)}
        </p>
        <p className="list-group-item list-group-item-action waves-effect">
          {" "}
          <Icon className="fa fa-map-marker" />
          {act.address} - {act.location}
        </p>
        {act.description !== null && (
          <p className="list-group-item list-group-item-action waves-effect">
            <b>Description:</b> {act.description}
          </p>
        )}

        <p className="list-group-item list-group-item-action waves-effect">
          {members}
        </p>
      </div>
    )
  })
}

export default ActivityList
