import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { login } from "../../redux/actions/users"
import { Redirect } from "react-router-dom"
import Search from "../search/Search"
import { getMember, addActivityToMember } from "../../redux/actions/members"
import "./MembersProfilePage.css"
import Modal from "@material-ui/core/Modal"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { getActivities } from "../../redux/actions/activities"

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
})

class MemberProfilePage extends PureComponent {
  state = {
    open: false,
    innerModalOpen: false,
    currentActivity: ""
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleInnerOpen = activity => {
    this.setState({
      innerModalOpen: true,
      currentActivity: activity
    })
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.getMember(this.props.match.params.id)
  }

  handleInnerClose = () => {
    this.setState({ innerModalOpen: false })
  }

  componentDidMount() {
    this.props.getMember(this.props.match.params.id)
    this.props.getActivities()
  }

  handleClick = activity => {
    this.setState({
      currentActivity: activity
    })
  }

  handleSubmit = (memberId, activityId) => {
    this.props.addActivityToMember(memberId, activityId)
    this.handleInnerClose()
    this.handleClose()
  }

  renderActivities = activities => {
    if (activities.length === 0) {
      return (
        <button className="list-group-item list-group-item-action waves-effect">
          You are currently not enrolled in an activity
        </button>
      )
    } else {
      return activities.map(activity => (
        <button className="list-group-item list-group-item-action waves-effect">
          {activity.name}
        </button>
      ))
    }
  }

  renderModalActivities = activites => {
    return activites.map(activity => (
      <div className="modal-body">
        <button
          onClick={() => this.handleInnerOpen(activity)}
          className="list-group-item list-group-item-action waves-effect"
        >
          {activity.name} | {activity.points} points
        </button>
      </div>
    ))
  }

  render() {
    const { member, currentUser, classes, activities } = this.props

    if (!member) return null

    return (
      <Container className="container-fluid mt-1">
        <Row className="justify-content-md-center">
          <Col md="6" className="mt-5 mb-5">
            {member.id && (
              <div className="jumbotron text-center">
                <h4 className="card-title font-bold pb-2">
                  <strong>
                    {member.firstName} {member.lastName}
                  </strong>
                </h4>

                <div className="view overlay my-4">
                  <img
                    src="https://www.amsterdamnetball.com/wp-content/uploads/2014/06/Netball-match-51-500x333.jpg"
                    className="img-fluid mx-auto d-block"
                    alt=""
                  />
                  <a href="#">
                    <div className="mask rgba-white-slight" />
                  </a>
                </div>

                <h5 className="indigo-text font-bold mb-4">
                  Member information
                </h5>

                <div className="md-form input-group mt-0 mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default1"
                      style={{ backgroundColor: "#fff" }}
                    >
                      Plays in team:
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default1"
                    disabled
                    style={{ textAlign: "right" }}
                    value={member.team}
                  />
                </div>

                <div className="md-form input-group mt-0 mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default1"
                      style={{ backgroundColor: "#fff" }}
                    >
                      Plays at positions:
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default1"
                    disabled
                    style={{ textAlign: "right" }}
                    value={member.positions.map(position => {
                      return position.positionName + " "
                    })}
                  />
                </div>

                <div className="md-form input-group mt-0 mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default1"
                      style={{ backgroundColor: "#fff" }}
                    >
                      Email address:
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default1"
                    disabled
                    style={{ textAlign: "right" }}
                    value={member.email}
                  />
                </div>

                <div className="md-form input-group mt-0 mb-3">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default1"
                      style={{ backgroundColor: "#fff" }}
                    >
                      Lives in:
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default1"
                    disabled
                    style={{ textAlign: "right" }}
                    value={member.city}
                  />
                </div>
                <div />

                <h5 className="indigo-text font-bold mb-4">Your activities</h5>

                <div class="list-group mb-4">
                  {this.renderActivities(member.activities)}

                  <Button
                    className="btn btn-info btn-block  btn-blue-grey my-4 "
                    onClick={this.handleOpen}
                  >
                    Join a new activity
                  </Button>
                  <div>
                    <Modal
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                      open={this.state.open}
                      onClose={this.handleClose}
                    >
                      <div style={getModalStyle()} className={classes.paper}>
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Select an activity you want to do
                            </h5>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                              onClick={this.handleClose}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          {this.renderModalActivities(activities)}

                          <div class="modal-footer">
                            <Button
                              className="btn btn-info btn-block  btn-blue-grey my-4 "
                              onClick={this.handleClose}
                            >
                              Close
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div>
                    <Modal
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                      open={this.state.innerModalOpen}
                      onClose={this.handleInnerClose}
                    >
                      <div style={getModalStyle()} className={classes.paper}>
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Activity name: {this.state.currentActivity.name}
                            </h5>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                              onClick={this.handleInnerClose}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <button className="list-group-item list-group-item-action waves-effect">
                            Activity address:{" "}
                            {this.state.currentActivity.address}
                          </button>
                          <button className="list-group-item list-group-item-action waves-effect">
                            Activity location:{" "}
                            {this.state.currentActivity.location}
                          </button>
                          <button className="list-group-item list-group-item-action waves-effect">
                            Starts at:{" "}
                            {new Date(
                              this.state.currentActivity.startTime
                            ).toLocaleTimeString()}
                          </button>
                          <button className="list-group-item list-group-item-action waves-effect">
                            End:{" "}
                            {new Date(
                              this.state.currentActivity.endTime
                            ).toLocaleTimeString()}
                          </button>
                          <button className="list-group-item list-group-item-action waves-effect">
                            Points for this activity:{" "}
                            {this.state.currentActivity.points}
                          </button>

                          <button
                            onClick={() =>
                              this.handleSubmit(
                                currentUser.id,
                                this.state.currentActivity.id
                              )
                            }
                            className="btn btn-success btn-block my-4 "
                            disabled={
                              !activities.includes(
                                this.state.currentActivity.id
                              )
                            }
                          >
                            {!activities.includes(this.state.currentActivity.id)
                              ? `You have already joined this activity`
                              : `Join this activity!`}
                          </button>
                          <div class="modal-footer">
                            <Button
                              className="btn btn-info btn-block  btn-blue-grey my-4 "
                              onClick={this.handleInnerClose}
                            >
                              Close
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>

                {currentUser.role === "admin" && (
                  <div>
                    <h5 className="indigo-text font-bold mb-4">
                      Extra information
                    </h5>

                    <div className="md-form input-group mt-0 mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-default1"
                          style={{ backgroundColor: "#fff" }}
                        >
                          Street address:
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default1"
                        disabled
                        style={{ textAlign: "right" }}
                        value={member.streetAddress}
                      />
                    </div>
                    <div className="md-form input-group mt-0 mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-default1"
                          style={{ backgroundColor: "#fff" }}
                        >
                          Postal code:
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default1"
                        disabled
                        style={{ textAlign: "right" }}
                        value={member.postalCode}
                      />
                    </div>

                    <div className="md-form input-group mt-0 mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-default1"
                          style={{ backgroundColor: "#fff" }}
                        >
                          Date of birth
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default1"
                        disabled
                        style={{ textAlign: "right" }}
                        value={new Date(
                          member.dateOfBirth
                        ).toLocaleDateString()}
                      />
                    </div>

                    <div className="md-form input-group mt-0 mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-default1"
                          style={{ backgroundColor: "#fff" }}
                        >
                          Membership start date:
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default1"
                        disabled
                        style={{ textAlign: "right" }}
                        value={new Date(member.startDate).toLocaleDateString()}
                      />
                    </div>
                    <div className="md-form input-group mt-0 mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-default1"
                          style={{ backgroundColor: "#fff" }}
                        >
                          Membership end date:
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default1"
                        disabled
                        style={{ textAlign: "right" }}
                        value={new Date(member.endDate).toLocaleDateString()}
                      />
                    </div>
                    <div className="md-form input-group mt-0 mb-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          id="inputGroup-sizing-default1"
                          style={{ backgroundColor: "#fff" }}
                        >
                          Is currently an active member:
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default1"
                        disabled
                        style={{ textAlign: "right" }}
                        value={member.isCurrentMember ? "Yes" : "No"}
                      />
                    </div>
                  </div>
                )}
                <a className="fa-lg p-2 m-2 li-ic">
                  <i className="fa fa-linkedin grey-text"> </i>
                </a>
                <a className="fa-lg p-2 m-2 tw-ic">
                  <i className="fa fa-twitter grey-text"> </i>
                </a>
                <a className="fa-lg p-2 m-2 fb-ic">
                  <i className="fa fa-facebook grey-text"> </i>
                </a>
                <Link to="/members">
                  <Button className="btn btn-info btn-block  btn-blue-grey my-4 ">
                    Back to all members
                  </Button>
                </Link>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    member: state.singleMember.member,
    currentUser: state.currentUser,
    activities: Object.values(state.activities.activities)
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getMember, getActivities, addActivityToMember }
  )(MemberProfilePage)
)
