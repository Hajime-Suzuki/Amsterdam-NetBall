import React from "react"
import { Link } from "react-router-dom"
import { Typography, Icon, Checkbox } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import styled from "styled-components"
import { StyledNameLink } from "../members/MembersListComponent"

const CustomCheckbox = styled(Checkbox)`
  &&& {
    color: ${({ checkbox_color }) => checkbox_color};
  }
`

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
            <CustomCheckbox
              checked={thisAttendance.isAttended}
              c="lightblue"
              onChange={() => changeAttendance(thisAttendance.id)}
            />
            {/* <p style={{ display: 'inline' }}> */}
            <Link to={`/members/${m.id}`}>
              {m.firstName} {m.lastName}
            </Link>
            {/* </p> */}
          </div>
        )
      })
    ) : (
      <Typography>No member</Typography>
    )

    return (
      <div className="mb-4" key={act.id}>
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

        <div className="list-group-item list-group-item-action waves-effect">
          {members}
        </div>
      </div>
    )
  })
}

export default ActivityList
