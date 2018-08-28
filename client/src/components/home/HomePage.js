import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { login } from "../../actions/users"
import { Redirect } from "react-router-dom"

// import { userId } from "../../jwt"

import "./HomePage.css"

class Homepage extends PureComponent {
  state = {
    email: "",
    password: "",
    submitButton: true
  }

  handleSubmit = e => {
    e.preventDefault()

    // this.props.onSubmit(this.state)

    console.log(this.state.email)
    console.log(this.state.password)

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

  componentDidMount() {}
  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="6" className="m-4">
            <form
              className="text-center border border-light p-5"
              onSubmit={this.handleSubmit}
            >
              <p className="h4 mb-4">Sign in</p>
              {/* <!-- Email --> */}
              <input
                type="email"
                id="defaultLoginFormEmail"
                className="form-control mb-4"
                placeholder="E-mail"
                name="email"
                value={this.state.email || ""}
                onChange={this.handleChange}
              />
              {/* <!-- Password --> */}
              <input
                type="password"
                id="defaultLoginFormPassword"
                className="form-control mb-4"
                placeholder="Password"
                name="password"
                value={this.state.password || ""}
                onChange={this.handleChange}
              />
              <div className="d-flex justify-content-around">
                <div>
                  {/* <!-- Remember me --> */}
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="defaultLoginFormRemember"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="defaultLoginFormRemember"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div>
                  {/* <!-- Forgot password --> */}
                  <a href="">Forgot password?</a>
                </div>
              </div>
              {/* <!-- Sign in button --> */}
              <Button
                className="btn btn-info btn-block  btn-blue-grey my-4"
                type="submit"
                disabled={this.state.submitButton}
              >
                Sign in
              </Button>

              {/* <!-- Register --> */}
              <p>
                Not a member? <Link to="/signup">Register</Link>
              </p>
              {/* <!-- Social login --> */}
              {/* <p>or sign in with:</p>

              <a type="button" class="light-blue-text mx-2">
                <i class="fa fa-facebook" />
              </a>
              <a type="button" class="light-blue-text mx-2">
                <i class="fa fa-twitter" />
              </a>
              <a type="button" class="light-blue-text mx-2">
                <i class="fa fa-linkedin" />
              </a>
              <a type="button" class="light-blue-text mx-2">
                <i class="fa fa-github" />
              </a> */}
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
