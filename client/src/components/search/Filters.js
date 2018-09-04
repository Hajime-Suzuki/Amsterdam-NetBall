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
    positions: {},
    clubRoles: {},
    roles: {},
    teams: {},
    currentMemberOption: 'currentMemberOnly'
  }
  componentDidMount() {
    this.props.getFilterOption()
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState(
      prev => {
        return {
          [name]: {
            ...this.state[name],
            [value]: !prev[name][value]
          }
        }
      },
      () => {
        console.log(this.state)
        this.props.handleSearch(this.state)
      }
    )
  }

  handleRadioButtonChange = e => {
    this.setState(
      {
        currentMemberOption: e.target.name
      },
      () => {
        this.props.handleSearch(this.state)
      }
    )
  }

  renderCheckboxes = (items, sectionName, keyName) => {
    // item[keyName] = positionName
    // sectionName = positoins
    return items.map(item => (
      <div className="custom-control custom-checkbox" key={item.id}>
        <input
          type="checkbox"
          className="custom-control-input"
          id={item[keyName]}
          name={sectionName}
          value={item.id}
          onChange={this.handleChange}
          checked={this.state[sectionName][item.id] || false}
        />
        <label className="custom-control-label" htmlFor={item[keyName]}>
          {item[keyName]}
        </label>
      </div>
    ))
  }

  renderCurrentMemberCheckboxes = (name, label) => {
    return (
      <div className="custom-control custom-radio">
        <input
          type="radio"
          className="custom-control-input"
          id={name}
          name={name}
          checked={this.state.currentMemberOption === name}
          onChange={this.handleRadioButtonChange}
        />
        <label className="custom-control-label" htmlFor={name}>
          {label}
        </label>
      </div>
    )
  }

  render() {
    const { filterOption } = this.props
    if (!this.props.filterOption.positions) return null
    return (
      <Row>
        <Col>
          <p>
            <b>Positions</b>
          </p>
          {this.renderCheckboxes(
            filterOption.positions,
            'positions',
            'positionName'
          )}
        </Col>

        <Col>
          <p>
            <b>Committee Roles</b>
          </p>
          {this.renderCheckboxes(filterOption.comittees, 'clubRoles', 'name')}
        </Col>

        <Col>
          <p>
            <b>Club Roles</b>
          </p>
          {this.renderCheckboxes(filterOption.roles, 'roles', 'roleName')}
        </Col>

        <Col>
          <p>
            <b>Teams</b>
          </p>
          {this.renderCheckboxes(filterOption.teams, 'teams', 'name')}
        </Col>

        <Col>
          <p>
            <b>Current Member</b>
          </p>
          {this.renderCurrentMemberCheckboxes(
            'currentMemberOnly',
            'Current Member Only'
          )}
          {this.renderCurrentMemberCheckboxes(
            'expiredMemberOnly',
            'Expired Member Only'
          )}
          {this.renderCurrentMemberCheckboxes('All', 'All')}
        </Col>
      </Row>
    )
  }
}

const mapSateToProps = state => ({
  filterOption: state.filterOption
})
export default connect(
  mapSateToProps,
  { getFilterOption }
)(Filters)
