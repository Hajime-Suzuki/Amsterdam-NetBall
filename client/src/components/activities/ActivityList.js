import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Container, Row, Col } from "mdbreact"
import { getActivities } from "../../redux/actions/activities"

class ActivityList extends PureComponent {
  componentDidMount() {
    this.props.getActivities()
  }

  filterOldActivities = activities =>
    activities.filter(activity => {
      const endTime = new Date(activity.endTime)
      const now = new Date()
      if (now < endTime) return activity
      return false
    })

  renderActivities = activities => {
    if (activities.length === 0) {
      return (
        <button className="list-group-item list-group-item-action waves-effect">
          There are no upcoming activities{" "}
        </button>
      )
    } else {
      return activities.map(activity => (
        <div className="text-center mb-4" key={activity.id}>
          <h3
            className="list-group-item list-group-item-action waves-effect "
            style={{ backgroundColor: "#fff" }}
          >
            {activity.name}
          </h3>

          <p className="list-group-item list-group-item-action waves-effect">
            {" "}
            <b> Activity address: </b> {activity.address} | {activity.location}
          </p>

          <p className="list-group-item list-group-item-action waves-effect">
            {" "}
            <b> Activity description: </b> {activity.description}
          </p>

          <p className="list-group-item list-group-item-action waves-effect">
            {" "}
            <b> Activity starts at: </b>
            {new Date(activity.startTime).toLocaleTimeString()} on{" "}
            {new Date(activity.startTime).toLocaleDateString()}
          </p>

          <p className="list-group-item list-group-item-action waves-effect">
            {" "}
            <b>Activity ends at: </b>
            {new Date(activity.endTime).toLocaleTimeString()} on{" "}
            {new Date(activity.endTime).toLocaleDateString()}
          </p>
        </div>
      ))
    }
  }

  render() {
    return (
      <Container className="container-fluid mt-1">
        <Row className="justify-content-md-center">
          <Col className="">
            <h2 className=" text-center">Upcoming volunteer activities</h2>
            {this.renderActivities(
              this.filterOldActivities(this.props.activities)
            )}
            <button
              className="list-group-item list-group-item-action waves-effect btn btn-info btn-block  btn-blue-grey my-4 text-center"
              onClick={() =>
                this.props.history.push(
                  `/members/${this.props.currentUser.id}#personal-activities`
                )
              }
            >
              Subscribe to an activity from your profile!
            </button>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    currentUser: state.currentUser,
    activities: Object.values(state.activities.activities)
  }
}
export default connect(
  mapStateToProps,
  { getActivities }
)(ActivityList)
