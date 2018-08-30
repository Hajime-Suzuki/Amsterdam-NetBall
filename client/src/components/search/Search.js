import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Input, Button } from 'mdbreact'
import { login } from '../../redux/actions/users'
import { Redirect } from 'react-router-dom'
// import { searchUsers } from "../../redux/actions/users" a
import './SearchBar.css'
import SearchBar from './SearchBar'
import Filters from './Filters'
import { searchMembers } from '../../redux/actions/members'

// import { userId } from "../../jwt"

class Search extends PureComponent {
  state = {
    name: '',
    positions: '',
    roles: ''
  }

  handleSearch = async data => {
    const updatedItems = {}
    const checkedItemToArray = (data, itemName) => {
      return Object.keys(data[itemName])
        .filter(key => data[itemName][key])
        .join(',')
    }

    if (data.name) updatedItems.name = data.name

    if (data.positions)
      updatedItems.positions = checkedItemToArray(data, 'positions')

    if (data.roles) updatedItems.roles = checkedItemToArray(data, 'roles')

    if (data.teams) updatedItems.teams = checkedItemToArray(data, 'teams')

    if (data.clubRoles)
      updatedItems.clubRoles = checkedItemToArray(data, 'clubRoles')

    this.setState(updatedItems, () => {
      this.props.searchMembers(this.state)
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <SearchBar handleSearch={this.handleSearch} />
        </Row>
        <Row>
          <Filters handleSearch={this.handleSearch} />
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {}
}

export default connect(
  mapStateToProps,
  { searchMembers }
)(Search)
