import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../redux/actions/users'
import SignupForm from './SignupForm'
import { Redirect } from 'react-router-dom'

class SignupPage extends PureComponent {
  handleSubmit = data => {
    console.log(data)
    this.props.postSignup(
      data.firstName,
      data.lastName,
      data.streetAddress,
      data.postalCode,
      data.city,
      data.dateOfBirth,
      // data.isCurrentMember,
      true,
      data.email,
      // data.phoneNum, NEED TO ADD PHONE
      data.password,
      //START DATE
      new Date().toLocaleDateString(),
      new Date().toLocaleDateString()
    )
  }

  render() {
    if (this.props.signup.success) return <Redirect to="/" />

    return (
      <div>
        <SignupForm onSubmit={this.handleSubmit} />

        <p style={{ color: 'red' }}>{this.props.signup.error}</p>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    signup: state.signup
  }
}

export default connect(
  mapStateToProps,
  { postSignup: signup }
)(SignupPage)
