import React, { Component } from 'react'
import ActivityList from './ActivityList'
import { connect } from 'react-redux'
import {
  getActivitiesAndMembers,
  activitiesArraySelector,
  editAttendance
} from '../../redux/actions/activities'

class AcivityListComponent extends Component {
  componentDidMount() {
    this.props.getActivitiesAndMembers()
  }
  changeAttendance = attendanceId => {
    // console.log(attendanceId)
    this.props.editAttendance(attendanceId)
  }
  render() {
    return (
      <ActivityList
        activities={this.props.activities}
        attendances={this.props.attendances}
        changeAttendance={this.changeAttendance}
      />
    )
  }
}

const mapSateToProps = state => ({
  activities: activitiesArraySelector(state),
  attendances: (state.activities && state.activities.attendance) || {}
})
export default connect(
  mapSateToProps,
  {
    getActivitiesAndMembers,
    editAttendance
  }
)(AcivityListComponent)
