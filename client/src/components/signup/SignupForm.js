import React, { PureComponent } from "react"
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
    password: "",
    confirmPassword: "",
    submitDisabled: true
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

    if (this.state.password !== "" && this.state.confirmPassword !== "") {
      this.setState({
        submitDisabled: false
      })
    }
  }

  render() {
    return (
      <div className="signup-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name
            <input
              type="firstName"
              name="firstName"
              value={this.state.firstName || ""}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Last Name
            <input
              type="lastName"
              name="lastName"
              value={this.state.lastName || ""}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Postal address
            <input
              type="streetAddress"
              name="streetAddress"
              value={this.state.streetAddress || ""}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Zip code
            <input
              type="postalCode"
              name="postalCode"
              value={this.state.postalCode || ""}
              onChange={this.handleChange}
            />
          </label>

          <label>
            City
            <input
              type="city"
              name="city"
              value={this.state.city || ""}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Phone number
            <input
              type="phoneNum"
              name="phoneNum"
              value={this.state.phoneNum || ""}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={this.state.email || ""}
              onChange={this.handleChange}
            />
          </label>

          <p>-- Optional --</p>

          <label>
            Occupation
            <input
              type="occupation"
              name="occupation"
              value={this.state.occupation || ""}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Employer
            <input
              type="employer"
              name="employer"
              value={this.state.employer || ""}
              onChange={this.handleChange}
            />
          </label>

          <textarea
            rows="4"
            cols="50"
            name="skills"
            value={this.state.skills || ""}
            onChange={this.handleChange}
          >
            Enter text here...
          </textarea>

          <p>-- Optional --</p>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={this.state.password || ""}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword || ""}
              onChange={this.handleChange}
            />
          </label>

          {this.state.password &&
            this.state.confirmPassword &&
            this.state.password !== this.state.confirmPassword && (
              <p style={{ color: "red" }}>The passwords do not match!</p>
            )}

          <button type="submit" disabled={this.state.submitDisabled}>
            Sign up
          </button>
        </form>
      </div>
    )
  }
}
