import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect, Route } from "react-router-dom"
class PrivateRoutes extends Component {
  render() {
    const { component: Component, path } = this.props

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
