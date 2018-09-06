import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { login } from "../../redux/actions/users"
import { Redirect } from "react-router-dom"
import "./HomePage.css"

class Homepage extends PureComponent {
  state = {
    email: "",
    password: "",
    submitButton: true
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.login(this.state.email, this.state.password)
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })

    if (this.state.password !== "" && this.state.email !== "") {
      this.setState({
        submitButton: false
      })
    }
  }

  render() {
    if (this.props.currentUser) return <Redirect to="/members" />

    return (
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md="6" className="mt-5 mb-5">
            <form
              className="text-center border border-light p-5"
              onSubmit={this.handleSubmit}
            >
              <p className="h4 mb-4">Sign in</p>
              <input
                type="email"
                id="defaultLoginFormEmail"
                className="form-control mb-4"
                placeholder="E-mail"
                name="email"
                value={this.state.email || ""}
                onChange={this.handleChange}
              />
              <input
                type="password"
                id="defaultLoginFormPassword"
                className="form-control mb-4"
                placeholder="Password"
                name="password"
                value={this.state.password || ""}
                onChange={this.handleChange}
              />

              <Button
                className="btn btn-info btn-block  btn-blue-grey my-4"
                type="submit"
              >
                Sign in
              </Button>
              <p>
                Not a member? <Link to="/signup">Register</Link>
              </p>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    currentUser: state.currentUser,
    error: state.login.error
  }
}

export default connect(
  mapStateToProps,
  { login }
)(Homepage)
