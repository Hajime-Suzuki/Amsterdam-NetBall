import React, { Component } from 'react'
import ActivityList from './ActivityList'
import { connect } from 'react-redux'
import {
  getActivitiesAndMembers,
  activitiesArraySelector
} from '../../redux/actions/activities'

class AcivityListComponent extends Component {
  componentDidMount() {
    this.props.getActivitiesAndMembers()
  }
  render() {
    return <ActivityList activities={this.props.activities} />
  }
}

const mapSateToProps = state => ({
  activities: activitiesArraySelector(state)
})
export default connect(
  mapSateToProps,
  { getActivitiesAndMembers }
)(AcivityListComponent)
