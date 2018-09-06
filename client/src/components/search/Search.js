import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Container, Row } from "mdbreact"
import "./SearchBar.css"
import SearchBar from "./SearchBar"
import Filters from "./Filters"
import { searchMembers } from "../../redux/actions/members"

class Search extends PureComponent {
  state = {
    name: "",
    positions: "",
    roles: "",
    currentMemberOption: ""
  }

  handleSearch = async data => {
    const updatedItems = {}
    const checkedItemToQueryString = (data, itemName) => {
      return Object.keys(data[itemName])
        .filter(key => data[itemName][key])
        .join(",")
    }

    if (data.name !== undefined) updatedItems.name = data.name

    if (data.positions)
      updatedItems.positions = checkedItemToQueryString(data, "positions")

    if (data.roles) updatedItems.roles = checkedItemToQueryString(data, "roles")

    if (data.teams) updatedItems.teams = checkedItemToQueryString(data, "teams")

    if (data.clubRoles)
      updatedItems.clubRoles = checkedItemToQueryString(data, "clubRoles")

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
      </Container>
    )
  }
}

export default connect(
  null,
  { searchMembers }
)(Search)
