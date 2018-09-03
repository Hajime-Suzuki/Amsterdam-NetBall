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
import FilterOrderDropDown from './FilterOrderDropDown'

// import { userId } from "../../jwt"

class Search extends PureComponent {
  state = {
    name: '',
    positions: '',
    roles: '',
    currentMemberOption: ''
  }

  handleSearch = async data => {
    const updatedItems = {}
    const checkedItemToQueryString = (data, itemName) => {
      return Object.keys(data[itemName])
        .filter(key => data[itemName][key])
        .join(',')
    }

    if (data.name !== undefined) updatedItems.name = data.name

    if (data.positions)
      updatedItems.positions = checkedItemToQueryString(data, 'positions')

    if (data.roles) updatedItems.roles = checkedItemToQueryString(data, 'roles')

    if (data.teams) updatedItems.teams = checkedItemToQueryString(data, 'teams')

    if (data.clubRoles)
      updatedItems.clubRoles = checkedItemToQueryString(data, 'clubRoles')

    if (data.currentMemberOption) {
      updatedItems.currentMemberOption = data.currentMemberOption
    }

    this.setState(updatedItems, () => {
      this.props.searchMembers({
        ...this.state,
        orderType: this.props.order.orderType,
        order: this.props.order.order
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const prevOrder = JSON.stringify(prevProps.order)
    const currentOrder = JSON.stringify(this.props.order)

    if (prevOrder !== currentOrder) {
      console.log(prevProps.order, this.props.order)
      this.handleSearch({
        orderType: this.props.order.orderType,
        order: this.props.order.order
      })
    }
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
        <FilterOrderDropDown />
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
