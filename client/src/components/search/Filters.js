import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Input, Button } from 'mdbreact'
import { login } from '../../redux/actions/users'
import { Redirect } from 'react-router-dom'
import './SearchBar.css'

import { clubRoles, teams, positions, roles } from '../../constants'

console.log(teams)

class Filters extends PureComponent {
  state = {
    teams: teams.map(t => ({ [t]: false })),
    positions: positions.map(p => ({ [p]: false })),
    clubRoles: clubRoles.map(c => ({ [c]: false })),
    roles: roles.map(r => ({ [r]: false }))
  }

  componentDidMount() {
    // teams.map(team =>
    //   this.setState({
    //     [team]: false
    //   })
    // )
    // clubRoles.map(clubRole =>
    //   this.setState({
    //     [clubRole]: false
    //   })
    // )
    // positions.map(position =>
    //   this.setState({
    //     [position]: false
    //   })
    // )
    // roles.map(roles =>
    //   this.setState({
    //     [roles]: false
    //   })
    // )
    // console.log(this.state)
  }

  handleChange = (type, name) => async _ => {
    await this.setState({
      [name]: !this.state[name]
    })

    if (this.state[name]) {
      this.state[type].push(name)
    } else if (!this.state[name]) {
      const positionIndex = this.state[type].indexOf(name)
      this.state[type].splice(positionIndex, 1)
    }
  }
  // this.props.handleChange({ positions: this.state.positions })
  renderClubRolesFilter = clubRoles => {
    return clubRoles.map(role => (
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id={role}
          name={role}
          onChange={this.handleChange('clubRoles', role)}
          checked={this.state[role]}
        />
        <label className="custom-control-label" htmlFor={role}>
          {role}
        </label>
      </div>
    ))
  }

  renderTeamsFilter = teams => {
    return teams.map(team => (
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id={team}
          name={team}
          onChange={this.handleChange('teams', team)}
          checked={this.state[team]}
        />
        <label className="custom-control-label" htmlFor={team}>
          {team}
        </label>
      </div>
    ))
  }

  renderPositionsFilter = positions => {
    return positions.map(position => (
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id={position}
          name={position}
          onChange={this.handleChange('positions', position)}
          checked={this.state[position]}
        />
        <label className="custom-control-label" htmlFor={position}>
          {position}
        </label>
      </div>
    ))
  }

  renderRolesFilter = roles => {
    return roles.map(role => (
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id={role}
          name={role}
          onChange={this.handleChange('roles', role)}
          checked={this.state[role]}
        />
        <label className="custom-control-label" htmlFor={role}>
          {role}
        </label>
      </div>
    ))
  }

  render() {
    const { positionNames: posName } = this.props
    return (
      <Row>
        {/* <Col>
          <p>Positions</p>
          {Object.keys(this.props.positionNames).map((key, i) => {
            return (
              <div className="custom-control custom-checkbox" key={i}>
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={key}
                  value={key}
                  name="positions"
                  onChange={this.props.handleChange}
                  checked={posName[key]}
                />
                <label className="custom-control-label" htmlFor={key}>
                  {key}
                </label>
              </div>
            )
          })}
        </Col> */}

        <Col>
          <p>
            <b>Positions</b>
          </p>
          {this.renderPositionsFilter(positions)}
        </Col>
        <Col>
          <p>
            <b>Committee Roles</b>
          </p>
          {this.renderClubRolesFilter(clubRoles)}
        </Col>
        <Col>
          <p>
            <b>Club Roles</b>
          </p>
          {this.renderRolesFilter(roles)}
        </Col>
        <Col>
          <p>
            <b>Teams</b>
          </p>
          {this.renderTeamsFilter(teams)}
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = function(state) {
  return {}
}

export default connect(
  mapStateToProps,
  {}
)(Filters)
