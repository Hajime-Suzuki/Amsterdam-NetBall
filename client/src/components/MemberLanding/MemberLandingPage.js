import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { login } from "../../redux/actions/users"
import { Redirect } from "react-router-dom"
import Search from "../search/Search"
import { getMembers } from "../../redux/actions/members"
import { Icon } from "@material-ui/core"

// import { userId } from "../../jwt"

class MemberLandingPage extends PureComponent {
  state = {}

  componentDidMount() {
    this.props.getMembers()
  }

  renderMembers = members => {
    return members.map(member => (
      <ul key={member.id}>
        <li>
          {member.firstName} {member.lastName}
        </li>
        <li>{member.streetAddress}</li>
        <li>{member.postalCode}</li>
        <li>{member.city}</li>
        <hr />
      </ul>
    ))
  }

  render() {
    const { members, currentUser } = this.props

    if (!currentUser) return <Redirect to="/" />

    if (!members) return "Loading"

    return (
      <Container className="container-fluid mt-5">
        <Row className="justify-content-md-center">
          <Col md="6" className="mt-5 mb-5">
            <div className="jumbotron text-center">
              <h4 className="card-title font-bold pb-2">
                <strong>Welcome to the Netball Amsterdam App.</strong>
              </h4>

              <Row className="justify-content-center">
                <Link to="/events">
                  <button className="btn btn-primary" style={{ width: "100%" }}>
                    <i className="fa fa-arrow-circle-o-right mr-1" />
                    Upcoming events and matches
                  </button>
                </Link>
              </Row>
              <Row className="justify-content-center ">
                <Link to="/events">
                  <button
                    className="btn btn-primary "
                    style={{ width: "100%" }}
                  >
                    <i className="fa fa-arrow-circle-o-right mr-1" />
                    Upcoming events and matches
                  </button>
                </Link>
              </Row>
              <Row className="justify-content-center">
                <Link to="/events">
                  <button
                    className="btn btn-primary "
                    style={{ width: "100%" }}
                  >
                    <i className="fa fa-arrow-circle-o-right mr-1" />
                    Upcoming events and matches
                  </button>
                </Link>
              </Row>
              <Row className="justify-content-center">
                <Link to="/events">
                  <button
                    className="btn btn-primary "
                    style={{ width: "100%" }}
                  >
                    <i className="fa fa-arrow-circle-o-right mr-1" />
                    Upcoming events and matches
                  </button>
                </Link>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    members:
      state.members === null ? null : Object.values(state.members.members),
    currentUser: state.currentUser
  }
}

export default connect(
  mapStateToProps,
  { getMembers }
)(MemberLandingPage)
