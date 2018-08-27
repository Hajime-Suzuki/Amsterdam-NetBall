import React, { PureComponent } from "react"
import { Container, Row, Col, Input, Button } from "mdbreact"
import "./SignupForm.css"

export default class SignupForm extends PureComponent {
  state = {
    firstName: "",
    lastName: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    phoneNum: "",
    occupation: "",
    employer: "",
    skills: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    submitButton: true
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  handleChange = async event => {
    const { name, value } = event.target

    await this.setState({
      [name]: value
    })

    if (
      this.state.password !== "" &&
      this.state.confirmPassword !== "" &&
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.streetAddress !== "" &&
      this.state.postalCode !== "" &&
      this.state.city !== "" &&
      this.state.phoneNum !== "" &&
      this.state.email !== "" &&
      this.state.confirmEmail !== ""
    ) {
      this.setState({
        submitButton: false
      })
    }
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="6">
            <form>
              <p className="h2 text-center mb-4 mt-4">Setup your profile</p>
              <div class="card card-body">
                <div className="grey-text">
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
                    icon="address-card"
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
                    label="Your postal code"
                    icon="address-card"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name="postalCode"
                    value={this.state.postalCode || ""}
                    onChange={this.handleChange}
                  />
                  <Input
                    label="Your city"
                    icon="address-card"
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
                    label="Your phone number"
                    icon="phone"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name="phoneNum"
                    value={this.state.phoneNum || ""}
                    onChange={this.handleChange}
                  />
                  <Input
                    label="Your current employer"
                    icon="briefcase"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name="employer"
                    value={this.state.employer || ""}
                    onChange={this.handleChange}
                  />
                  <Input
                    type="textarea"
                    label="Other useful skills"
                    icon="archive"
                    value={this.state.skills || ""}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <p className="h2 text-center mb-4 mt-4">Email and Password</p>
              <div class="card card-body">
                <Input
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  name="email"
                  value={this.state.email || ""}
                  onChange={this.handleChange}
                />
                <Input
                  label="Confirm your email"
                  icon="exclamation-triangle"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="email"
                  value={this.state.confirmEmail || ""}
                  onChange={this.handleChange}
                />
                <Input
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  name="password"
                  value={this.state.password || ""}
                  onChange={this.handleChange}
                />
                <Input
                  label="Confirm your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  name="confirmPassword"
                  value={this.state.confirmPassword || ""}
                  onChange={this.handleChange}
                />
              </div>

              <div className="text-center" id="submit-btn">
                <Button
                  type="button"
                  className="btn btn-blue-grey m-4 btn-lg"
                  disabled={this.state.submitButton}
                >
                  Sign up
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}
