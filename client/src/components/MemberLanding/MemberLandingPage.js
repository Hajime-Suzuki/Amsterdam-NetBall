import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { login, getUsers } from "../../redux/actions/users"
import { Redirect } from "react-router-dom"
import Search from "../search/Search"

// import { userId } from "../../jwt"

class MemberLandingPage extends PureComponent {
  state = {}

  componentDidMount() {
    this.props.getUsers()
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
    const { users } = this.props
    return (
      <Container>
        <Row className="justify-content-md-center">
          <h1>Member landing page is rendered!</h1>
          <Search />

          <Row>{users && this.renderMembers(users)}</Row>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    users: state.users === null ? null : Object.values(state.users),
    currentUser: state.currentUser
  }
}

export default connect(
  mapStateToProps,
  { getUsers }
)(MemberLandingPage)
