import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import MemberListComponent from '../components/members/MembersListComponent'
import { connect } from 'react-redux'
class AdminRoute extends Component {
  render() {
    const { component: Component, path, userRole } = this.props

    return (
      <Route
        path={path}
        render={props => {
          if (userRole !== 'admin') return <Redirect to="/" />
          return <Component {...props} />
        }}
      />
    )
  }
}
const mapSateToProps = state => ({
  currentUserId: state.currentUser && state.currentUser.id,
  userRole: state.currentUser && state.currentUser.role
})

export default connect(mapSateToProps)(AdminRoute)
