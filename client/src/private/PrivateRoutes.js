import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import MemberListComponent from '../components/members/MembersListComponent'
import { connect } from 'react-redux'
class PrivateRoutes extends Component {
  render() {
    const { component: Component, path } = this.props
    console.log('iaoshent a')

    return (
      <Route
        path={path}
        render={props => {
          if (!this.props.currentUser) return <Redirect to="/" />
          return <Component {...props} />
        }}
      />
    )
  }
}
const mapStateToProps = state => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps)(PrivateRoutes)
