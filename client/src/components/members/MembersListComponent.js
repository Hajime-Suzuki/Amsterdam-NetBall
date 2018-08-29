import React, { PureComponent } from "react"

import { connect } from "react-redux"
import { getUsers } from "../../redux/actions/users"

class MemberListComponent extends PureComponent {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    return <table className="table" />
  }
}

const mapSateToProps = state => ({
  members: state.users.users
})

export default connect(
  mapSateToProps,
  { getUsers }
)(MemberListComponent)
