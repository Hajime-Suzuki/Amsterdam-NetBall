import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import CommitteeAdmin from "./CommitteeAdmin"

class Dashboard extends PureComponent {

  render() {
    if (!this.props.currentUser) return <Redirect to="/home" />

    // if isn't admin
    // if (!this.props.currentUser) return <Redirect to="/home" />

    return (
      <div>
        <h1>Dashboard</h1>
        <CommitteeAdmin />
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(Dashboard)
