import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { login } from "../../redux/actions/users"
import { Redirect } from "react-router-dom"
// import { searchUsers } from "../../redux/actions/users"
import "./SearchBar.css"
import SearchBar from "./SearchBar"
import Filters from "./Filters"

// import { userId } from "../../jwt"

class Search extends PureComponent {
  state = {
    name: "",
    positions: ""
  }

  handleSearch = async data => {
    if (data.name) {
      await this.setState({
        name: data.name
      })
    }

    if (data.positions) {
      await this.setState({
        positions: data.positions.join(",")
      })
    }

    this.props.searchUsers(this.state)
  }

  componentDidMount() {}
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
  mapStateToProps
  // { searchUsers }
)(Search)