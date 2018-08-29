import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Input, Button } from 'mdbreact'
import { Redirect } from 'react-router-dom'
import './SearchBar.css'
import SearchBar from './SearchBar'
import Filters from './Filters'
import { searchUsers } from '../../redux/actions/members'

// import { userId } from "../../jwt"

class Search extends PureComponent {
  state = {
    name: '',
    positionNames: {
      GA: false,
      GS: false,
      WA: false,
      WD: false,
      C: false,
      GD: false,
      GK: false
    },
    positions: [],
    roles: ''
  }

  handleChange = event => {
    const { name, value } = event.target

    let updatedValue = value

    if (name === 'positions') {
      updatedValue = Array.from(new Set([...this.state.positions, value]))
    }

    //   if (data.roles) {
    //     await this.setState({
    //       roles: data.roles.join(",")
    //     })
    //   }
    // }
    this.setState(
      ({ positionNames }) => ({
        [name]: updatedValue,
        positionNames:
          name === 'positions'
            ? {
                ...positionNames,
                [value]: !positionNames[value]
              }
            : positionNames
      }),
      () =>
        this.props.searchUsers({
          ...this.state,
          positions: this.state.positions.join(',')
        })
    )

    // () => this.props.searchUsers(this.state)
  }
  componentDidMount() {}
  render() {
    console.log(this.state)

    return (
      <Container>
        <Row>
          <SearchBar
            handleSearch={this.handleSearch}
            name={this.state.name}
            handleChange={this.handleChange}
          />
        </Row>
        <Row>
          <Filters
            positions={this.state.positions}
            handleChange={this.handleChange}
            positionNames={this.state.positionNames}
          />
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
  { searchUsers }
)(Search)
