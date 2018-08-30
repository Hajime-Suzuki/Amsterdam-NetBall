import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { login } from "../../redux/actions/users"
import { Redirect } from "react-router-dom"
import Search from "../search/Search"
import { getMember } from "../../redux/actions/members"
import "./MembersProfilePage.css"

// import { userId } from "../../jwt"

class MemberProfilePage extends PureComponent {
  state = {}

  componentDidMount() {
    this.props.getMember(this.props.match.params.id)
    // console.log(this.props.match.params.id)
  }

  render() {
    const { member, currentUser } = this.props

    return (
      <Container>
        <Row className="justify-content-md-center">
          {member && (
            <div className="jumbotron text-center m-4">
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

              <h5 className="indigo-text font-bold mb-4">Member information</h5>

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
                      value={new Date(member.dateOfBirth).toLocaleDateString()}
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
            </div>
          )}
        </Row>
        <Row className="justify-content-md-center">
          <Link to="/members">
            {" "}
            <Button className="btn btn-info btn-block  btn-blue-grey my-4">
              Back to the members list
            </Button>
          </Link>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    member: state.members.payload === null ? null : state.members.payload,
    currentUser: state.currentUser
  }
}

export default connect(
  mapStateToProps,
  { getMember }
)(MemberProfilePage)
