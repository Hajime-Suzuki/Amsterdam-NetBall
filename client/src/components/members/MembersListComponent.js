import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { getMembers } from '../../redux/actions/members'
import { allMemberInfoSelector } from '../../redux/actions/members'

class MemberListComponent extends PureComponent {
  componentDidMount() {
    this.props.getMembers()
  }
  render() {
    const { members } = this.props
    if (!members) return 'loading...'
    console.log(members)

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Expiration</th>
            <th scope="col">Something</th>
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
  members: allMemberInfoSelector(state)
})

export default connect(
  mapSateToProps,
  { getMembers }
)(MemberListComponent)
