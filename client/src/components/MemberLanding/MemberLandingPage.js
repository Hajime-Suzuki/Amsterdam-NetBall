import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { login } from "../../actions/users"
import { Redirect } from "react-router-dom"
import SearchBar from "../search/SearchBar"

// import { userId } from "../../jwt"

class MemberLandingPage extends PureComponent {
  state = {}

  componentDidMount() {}
  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <h1>Member landing page is rendered!</h1>
          <SearchBar />
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    users: state.users,
    currentUser: state.currentUser
  }
}

export default connect(
  mapStateToProps,
  {}
)(MemberLandingPage)
