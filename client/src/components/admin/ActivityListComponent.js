import React, { Component } from "react"
import ActivityList from "./ActivityList"
import { connect } from "react-redux"
import {
  getActivitiesAndMembers,
  activitiesArraySelector,
  editAttendance
} from "../../redux/actions/activities"
import { Container, Row, Col, Input, Button } from "mdbreact"

class AcivityListComponent extends Component {
  componentDidMount() {
    this.props.getActivitiesAndMembers()
  }
  changeAttendance = attendanceId => {
    this.props.editAttendance(attendanceId)
  }
  render() {
    return (
      <Container className="container-fluid mt-1">
        <Row className="justify-content-md-center">
          <Col className="">
            <h2 className=" text-center">Attendance per activity</h2>

            <ActivityList
              activities={this.props.activities}
              attendances={this.props.attendances}
              changeAttendance={this.changeAttendance}
            />
          </Col>
        </Row>
      </Container>
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
