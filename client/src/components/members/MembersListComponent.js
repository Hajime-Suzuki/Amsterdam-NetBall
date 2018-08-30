import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { getMembers } from '../../redux/actions/members'
import { allMemberInfoSelector } from '../../redux/actions/members'
import Search from '../search/Search'

class MemberListComponent extends PureComponent {
  state = {
    order: null
  }

  componentDidMount() {
    this.props.getMembers()
  }

  sortByMembers = type => {
    this.setState({
      order: this.state.order ? null : type
    })
  }

  render() {
    const { members, fetching } = this.props
    if (fetching.members) return 'loading...'

    return (
      <div>
        <Search order={this.state.order} />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Expiration</th>
              <th scope="col" onClick={() => this.sortByMembers('points')}>
                Activity Points
              </th>
            </tr>
            {members.map(m => {
              return (
                <tr key={m.id}>
                  <th scope="row">
                    {m.firstName} {m.lastName}
                  </th>
                  <th>{m.endDate}</th>
                  <th>{m.activityPoints}</th>
                </tr>
              )
            })}
          </thead>
        </table>
        {!members.length && <div>No Match</div>}
      </div>
    )
  }
}

const mapSateToProps = state => ({
  members: allMemberInfoSelector(state),
  fetching: state.fetching
})

export default connect(
  mapSateToProps,
  { getMembers }
)(MemberListComponent)
