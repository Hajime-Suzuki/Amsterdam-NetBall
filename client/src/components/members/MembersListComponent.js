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

  changeSortCondition = (orderType, ascOrDesc) => {
    this.setState({
      order: {
        orderType,
        order: ascOrDesc
      }
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
              <th scope="col">
                Activity Points
                <span onClick={() => this.changeSortCondition('points', 'ASC')}>
                  {' '}
                  ↑{' '}
                </span>
                <span
                  onClick={() => this.changeSortCondition('points', 'DESC')}
                >
                  {' '}
                  ↓{' '}
                </span>
              </th>
              <th scope="col">
                Attendance Rate
                <span
                  onClick={() =>
                    this.changeSortCondition('activityRate', 'ASC')
                  }
                >
                  {' '}
                  ↑{' '}
                </span>
                <span
                  onClick={() =>
                    this.changeSortCondition('activityRate', 'DESC')
                  }
                >
                  {' '}
                  ↓{' '}
                </span>
              </th>
            </tr>
            {members.map(m => {
              const attendanceRate =
                m.attendanceRate === null ? '-' : `${m.attendanceRate * 100}%`
              const activityPoints =
                m.activityPoints === null ? '-' : m.activityPoints
              return (
                <tr key={m.id}>
                  <th scope="row">
                    {m.firstName} {m.lastName}
                  </th>
                  <th>{m.endDate}</th>
                  <th>{activityPoints}</th>
                  <th>{attendanceRate}</th>
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
