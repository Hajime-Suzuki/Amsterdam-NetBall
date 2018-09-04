import React, { PureComponent } from "react"
import { Container, Row, Col, Input, Button } from "mdbreact"
// import "./SignupForm.css"

export default class CreateActivityForm extends PureComponent {
  state = {
    name: "",
    location: "",
    address: "",
    startTime: "",
    endTime: "",
    submitButton: true
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit({
      name: this.state.name,
      location: this.state.location,
      address: this.state.address,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    })
  }

  handleChange = async event => {
    const { name, value } = event.target

    await this.setState({
      [name]: value
    })

    if (
      this.state.name !== "" &&
      this.state.location !== "" &&
      this.state.address !== "" &&
      this.state.startTime !== "" &&
      this.state.endTime !== ""
    ) {
      this.setState({
        submitButton: false
      })
    }
    console.log(this.state)
  }

  onFocus = e => {
    e.currentTarget.type = "datetime-local"
  }
  onBlur = e => {
    e.currentTarget.type = "text"
    e.currentTarget.placeholder = "Enter a Date"
  }

  render() {
    return (
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md="6">
            <form onSubmit={this.handleSubmit}>
              <p className="h2 text-center mb-4 mt-4">Create an activity</p>
              <div className="card card-body">
                <div className="grey-text">
                  <Input
                    label="Activity name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name="name"
                    value={this.state.name || ""}
                    onChange={this.handleChange}
                  />
                  <Input
                    label="Activity location (city)"
                    icon="address-card"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name="location"
                    value={this.state.location || ""}
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
                    name="address"
                    value={this.state.address || ""}
                    onChange={this.handleChange}
                  />

                  <Input
                    label="Start date and time of the activity"
                    icon="calendar"
                    group
                    validate
                    error="wrong"
                    success="right"
                    name="startTime"
                    type="text"
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    value={this.state.startTime || ""}
                    onChange={this.handleChange}
                  />

                  <Input
                    label="End date and time of the activity"
                    icon="calendar"
                    group
                    validate
                    error="wrong"
                    success="right"
                    name="endTime"
                    type="text"
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    value={this.state.endTime || ""}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="text-center" id="submit-btn">
                <Button
                  type="submit"
                  className="btn btn-blue-grey m-4 btn-lg"
                  disabled={this.state.submitButton}
                >
                  Add activity
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}