import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { login } from "../../redux/actions/users"
import { Redirect } from "react-router-dom"
import Search from "../search/Search"
import {
  getMember,
  addActivityToMember,
  removeActivityFromMember
} from "../../redux/actions/members"
import "./MembersProfilePage.css"
import Modal from "@material-ui/core/Modal"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { getActivities } from "../../redux/actions/activities"
import { Divider } from "@material-ui/core"

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
    editProfileModalOpen: false,
    innerModalOpen: false,
    currentActivity: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    postalCode: "",
    dateOfBirth: "",
    city: "",
    phoneNum: "",
    occupation: "",
    employer: "",
    skills: "",
    email: ""
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleEditProfileOpen = () => {
    this.setState({ editProfileModalOpen: true })
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

  handleEditProfileClose = () => {
    this.setState({ editProfileModalOpen: false })
    // this.handleUpdateProfile(this.props.currentUser.id, activity.id)
  }

  handleInnerClose = () => {
    this.setState({ innerModalOpen: false })
  }

  componentDidMount() {
    this.props.getMember(this.props.match.params.id)
    this.props.getActivities()
  }

  handleChange = async event => {
    const { name, value } = event.target

    await this.setState({
      [name]: value
    })
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

  handleUnsubscribe = (memberId, activityId) => {
    this.props.removeActivityFromMember(memberId, activityId)
    this.props.getMember(this.props.match.params.id)
  }

  renderProfileFields = () => {
    return (
      <div>
        <button className="list-group-item list-group-item-action waves-effect">
          <Input
            label="Your first name"
            icon="user"
            group
            type="text"
            validate
            error="wrong"
            success="right"
            name="firstName"
            value={this.state.firstName || ""}
            onChange={this.handleChange}
          />

          <Input
            label="Your last name"
            icon="user"
            group
            type="text"
            validate
            error="wrong"
            success="right"
            name="lastName"
            value={this.state.lastName || ""}
            onChange={this.handleChange}
          />
          <Input
            label="Your street address"
            icon="user"
            group
            type="text"
            validate
            error="wrong"
            success="right"
            name="streetAddress"
            value={this.state.streetAddress || ""}
            onChange={this.handleChange}
          />

          <Input
            label="Your city"
            icon="user"
            group
            type="text"
            validate
            error="wrong"
            success="right"
            name="city"
            value={this.state.city || ""}
            onChange={this.handleChange}
          />
          <Input
            label="Your email"
            icon="user"
            group
            type="text"
            validate
            error="wrong"
            success="right"
            name="email"
            value={this.state.email || ""}
            onChange={this.handleChange}
          />

          <button
            className="btn btn-warning my-4"
            onClick={this.handleEditProfileClose}
          >
            Save updates
          </button>
        </button>
      </div>
    )
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
        <div>
          <button
            className="list-group-item list-group-item-action waves-effect"
            key={activity.id}
          >
            <p className="list-group-item list-group-item-action waves-effect">
              {" "}
              <b>Activity name: </b> {activity.name}
            </p>

            <p className="list-group-item list-group-item-action waves-effect">
              {" "}
              <b> Activity address: </b> {activity.address} |{" "}
              {activity.location}
            </p>

            <p className="list-group-item list-group-item-action waves-effect">
              {" "}
              <b> Activity starts at: </b>{" "}
              {new Date(activity.startTime).toLocaleDateString()} |{" "}
              {new Date(activity.startTime).toLocaleTimeString()}
            </p>

            <p className="list-group-item list-group-item-action waves-effect">
              {" "}
              <b>Activity ends at: </b>{" "}
              {new Date(activity.endTime).toLocaleDateString()} |{" "}
              {new Date(activity.endTime).toLocaleTimeString()}
            </p>

            <button
              className="btn btn-warning my-4"
              onClick={() =>
                this.handleUnsubscribe(this.props.currentUser.id, activity.id)
              }
            >
              Unsubscribe from activity
            </button>
          </button>
        </div>
      ))
    }
  }

  filterOldActivities = activities =>
    activities.filter(activity => {
      const endTime = new Date(activity.endTime)
      const now = new Date()
      if (now < endTime) return activity
    })

  renderModalActivities = activites => {
    return activites.map(activity => (
      <div className="modal-body" key={activites.id}>
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

                <div className="list-group mb-4">
                  {this.renderActivities(
                    this.filterOldActivities(member.activities)
                  )}

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
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Select an activity you want to do
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                              onClick={this.handleClose}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          {this.renderModalActivities(
                            this.filterOldActivities(activities)
                          )}

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
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Activity name: {this.state.currentActivity.name}
                            </h5>
                            <button
                              type="button"
                              className="close"
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
                            disabled={member.activities.some(act => {
                              return act.id === this.state.currentActivity.id
                            })}
                          >
                            {member.activities.some(act => {
                              return act.id === this.state.currentActivity.id
                            })
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

                {(currentUser.role === "admin" ||
                  currentUser.role === "member") && (
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

                    {currentUser.role === "admin" && (
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
                    )}
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
                <Button
                  className="btn btn-info btn-block  btn-blue-grey my-4 "
                  onClick={this.handleEditProfileOpen}
                >
                  Edit your profile
                </Button>
                <div>
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.editProfileModalOpen}
                    onClose={this.handleEditProfileClose}
                  >
                    <div style={getModalStyle()} className={classes.paper}>
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Update your info
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={this.handleEditProfileClose}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        {this.renderProfileFields()}
                        <div class="modal-footer">
                          <Button
                            className="btn btn-info btn-block  btn-blue-grey my-4 "
                            onClick={this.handleEditProfileClose}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
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
    { getMember, getActivities, addActivityToMember, removeActivityFromMember }
  )(MemberProfilePage)
)
