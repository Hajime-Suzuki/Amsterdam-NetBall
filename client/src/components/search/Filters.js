import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Input, Button } from 'mdbreact'
import { login } from '../../redux/actions/users'
import { Redirect } from 'react-router-dom'
import './SearchBar.css'
import { baseUrl } from '../../constants'
import { getFilterOption } from '../../redux/actions/filterOption'

class Filters extends PureComponent {
  state = {
    teams: null,
    positions: null,
    clubRoles: null,
    roles: null
  }

  componentDidMount() {
    this.props.getFilterOption()
    // fetch(`${baseUrl}/metadata`)
    //   .then(res => res.json())
    //   .then(({ teams, positions, comittees, roles }) => {
    //     if (this.state.isMounted) {
    //       this.setState({
    //         teams,
    //         positions,
    //         clubRoles: comittees,
    //         roles
    //       })
    //     }
    //   })
  }

  handleChange = (type, name) => async _ => {
    // await this.setState({
    //   [name]: !this.state[name]
    // })
    // if (this.state[name]) {
    //   this.state[type].push(name)
    // } else if (!this.state[name]) {
    //   const positionIndex = this.state[type].indexOf(name)
    //   this.state[type].splice(positionIndex, 1)
    // }
  }

  // renderClubRolesFilter = clubRoles => {
  //   return clubRoles.map((role, i) => (
  //     <div className="custom-control custom-checkbox" key={i}>
  //       <input
  //         type="checkbox"
  //         className="custom-control-input"
  //         id={role}
  //         name={role}
  //         onChange={this.handleChange('clubRoles', role)}
  //         checked={this.state[role]}
  //       />
  //       <label className="custom-control-label" htmlFor={role}>
  //         {role}
  //       </label>
  //     </div>
  //   ))
  // }

  // renderTeamsFilter = teams => {
  //   return teams.map((team, i) => (
  //     <div className="custom-control custom-checkbox" key={i}>
  //       <input
  //         type="checkbox"
  //         className="custom-control-input"
  //         id={team}
  //         name={team}
  //         onChange={this.handleChange('teams', team)}
  //         checked={this.state[team]}
  //       />
  //       <label className="custom-control-label" htmlFor={team}>
  //         {team}
  //       </label>
  //     </div>
  //   ))
  // }

  renderPositionsFilter = positions => {
    return positions.map((position, i) => (
      <div className="custom-control custom-checkbox" key={i}>
        <input
          type="checkbox"
          className="custom-control-input"
          id={position.positionName}
          name={position}
          onChange={this.handleChange('positions', position)}
          checked={this.state[position]}
        />
        <label className="custom-control-label" htmlFor={position}>
          {position.positionName}
        </label>
      </div>
    ))
  }

  // renderRolesFilter = roles => {
  //   return roles.map((role, i) => (
  //     <div className="custom-control custom-checkbox" key={i}>
  //       <input
  //         type="checkbox"
  //         className="custom-control-input"
  //         id={role}
  //         name={role}
  //         onChange={this.handleChange('roles', role)}
  //         checked={this.state[role]}
  //       />
  //       <label className="custom-control-label" htmlFor={role}>
  //         {role}
  //       </label>
  //     </div>
  //   ))
  // }

  render() {
    if (!this.state.positions) return null
    console.log(this.state.positions)
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
          {this.renderPositionsFilter(this.state.positions)}
        </Col>
        {/* <Col>
          <p>
            <b>Committee Roles</b>
          </p>
          {this.renderClubRolesFilter(this.state.clubRoles)}
        </Col>
        <Col>
          <p>
            <b>Club Roles</b>
          </p>
          {this.renderRolesFilter(this.state.roles)}
        </Col>
        <Col>
          <p>
            <b>Teams</b>
          </p>
          {this.renderTeamsFilter(this.state.teams)}
        </Col> */}
      </Row>
    )
  }
}

export default connect(
  null,
  { getFilterOption }
)(Filters)
