import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { login } from "../../redux/actions/users"
import { Redirect } from "react-router-dom"
import Search from "../search/Search"
import { getMember } from "../../redux/actions/members"
import "./MembersProfilePage.css"
import Modal from "@material-ui/core/Modal"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50
  // + rand()
  const left = 50
  //  + rand()

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
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidMount() {
    this.props.getMember(this.props.match.params.id)
  }

  render() {
    const { member, currentUser, classes } = this.props

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
                  <a
                    href="#"
                    class="list-group-item list-group-item-action waves-effect"
                  >
                    Activity 1
                  </a>
                  <a
                    href="#"
                    class="list-group-item list-group-item-action waves-effect"
                  >
                    Activity 2
                  </a>
                  <a
                    href="#"
                    class="list-group-item list-group-item-action waves-effect"
                  >
                    Activity 3
                  </a>
                  <a
                    href="#"
                    class="list-group-item list-group-item-action waves-effect"
                  >
                    Activity 4
                  </a>
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
                          <div class="modal-body">Activity 5 - 1 hours</div>
                          <div class="modal-body">Activity 6 - 1 hours</div>
                          <div class="modal-body">Activity 7 - 1 hours</div>
                          <div class="modal-body">Activity 8 - 1 hours</div>
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
                  <div
                    class="modal fade"
                    id="basicExampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            Modal title
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">...</div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" class="btn btn-primary">
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
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

                {/* <a className="card-meta">Member information</a>
              <hr />
              <h4 className="card-text">
                <b>Plays at positions: </b>{" "}
                {member.positions.map(position => {
                  return position.positionName + " "
                })}
              </h4>
              <hr />
              <h4 className="card-text">
                <b>Email: </b> {member.email}
              </h4>
              <hr />

              <p className="card-text">
                Sed ut perspiciatis unde omnis iste natus sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.
              </p> */}

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
        {/* <Row className="justify-content-md-center">
          <Link to="/members">
            {" "}
            <Button className="btn btn-info btn-block  btn-blue-grey my-4">
              Back to the members list
            </Button>
          </Link>
        </Row> */}
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    member: state.singleMember.member,
    currentUser: state.currentUser
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getMember }
  )(MemberProfilePage)
)
