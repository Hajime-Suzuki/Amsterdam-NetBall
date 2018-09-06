import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
class AdminRoute extends Component {
  render() {
    const { component: Component, path, userRole } = this.props

    return (
      <Route
        path={path}
        render={props => {
          if (userRole !== "admin") return <Redirect to="/" />
          return <Component {...props} />
        }}
      />
    )
  }
}
const mapStateToProps = state => ({
  currentUserId: state.currentUser && state.currentUser.id,
  userRole: state.currentUser && state.currentUser.role
})

export default connect(mapStateToProps)(AdminRoute)
