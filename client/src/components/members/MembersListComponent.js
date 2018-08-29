import React, { PureComponent } from "react"


import { connect } from 'react-redux'
import { getUsers, getMemberArray } from '../../redux/actions/users'


class MemberListComponent extends PureComponent {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    const { members } = this.props
    if (!members) return 'loading...'
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Expiration</th>
          </tr>
          {members.map(m => {
            return (
              <tr key={m.id}>
                <th scope="row">
                  {m.firstName} {m.lastName}
                </th>
                <th>{m.endDate}</th>
              </tr>
            )
          })}
        </thead>
      </table>
    )
  }
}

const mapSateToProps = state => ({
  members: getMemberArray(state)
})

export default connect(
  mapSateToProps,
  { getUsers }
)(MemberListComponent)
