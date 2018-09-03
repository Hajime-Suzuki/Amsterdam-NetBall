import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { getMembers } from '../../redux/actions/members'
import { allMemberInfoSelector } from '../../redux/actions/members'
import Search from '../search/Search'

class MemberListComponent extends PureComponent {
  state = {
    order: {
      orderType: null,
      order: null
    }
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

  renderIcons = type => {
    return (
      <span>
        <i
          className="fa fa-arrow-up"
          aria-hidden="true"
          onClick={() => this.changeSortCondition(type, 'ASC')}
        />
        <i
          className="fa fa-arrow-down"
          aria-hidden="true"
          onClick={() => this.changeSortCondition(type, 'DESC')}
        />
      </span>
    )
  }

  render() {
    const { members, fetching } = this.props
    if (fetching.members) return 'loading...'

    const ifSelected = type => {
      if (type === this.state.order.orderType) {
        return {
          backgroundColor: 'rgba(255, 213, 249, 0.3)'
        }
      }
      return {}
    }
    return (
      <div>
        <Search order={this.state.order} />

        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={ifSelected('name')}>
                Name
                {this.renderIcons('name')}
              </th>
              <th scope="col" style={ifSelected('expiration')}>
                Expiration
                {this.renderIcons('expiration')}
              </th>
              <th scope="col" style={ifSelected('points')}>
                Activity Points
                {this.renderIcons('points')}
              </th>
              <th scope="col" style={ifSelected('activityRate')}>
                Attendance Rate
                {this.renderIcons('activityRate')}
              </th>
              <th scope="col">Member</th>
            </tr>
            {members.map(m => {
              const attendanceRate =
                m.attendanceRate === null ? '-' : `${m.attendanceRate * 100}%`
              const activityPoints =
                m.activityPoints === null ? '-' : m.activityPoints
              return (
                <tr key={m.id}>
                  <th scope="row" style={ifSelected('name')}>
                    {m.firstName} {m.lastName}
                  </th>
                  <th style={ifSelected('expiration')}>{m.endDate}</th>
                  <th style={ifSelected('points')}>{activityPoints}</th>
                  <th style={ifSelected('activityRate')}>{attendanceRate}</th>
                  <th>{m.isCurrentMember ? 'o' : 'x'}</th>
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
