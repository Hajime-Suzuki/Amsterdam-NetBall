import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import CommitteeAdmin from './CommitteeAdmin'
import CreateActivityForm from '../activities/CreateActivityForm'
import { createActivity } from '../../redux/actions/activities'
import ActivityListComponent from './ActivityListComponent'

class Dashboard extends PureComponent {
  handleSubmit = data => {
    this.props.createActivity(data)
  }

  render() {
    if (!this.props.currentUser) return <Redirect to="/home" />

    // if isn't admin
    if (!this.props.currentUser.role === 'admin') return <Redirect to="/home" />

    return (
      <div>
        <h1>Dashboard</h1>
        <CommitteeAdmin />
        <CreateActivityForm onSubmit={this.handleSubmit} />
        <ActivityListComponent />
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(
  mapStateToProps,
  { createActivity }
)(Dashboard)
