import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Input, Button } from 'mdbreact'
import { login } from '../../redux/actions/users'
import { Redirect } from 'react-router-dom'
import './SearchBar.css'

// import { userId } from "../../jwt"

class SearchBar extends PureComponent {
  state = {
    name: ''
  }

  handleSubmit = e => {
    e.preventDefault()

    console.log(this.state)
  }

  handleChange = async event => {
    const { name, value } = event.target

    await this.setState({
      [name]: value
    })

    console.log(this.state)
    this.props.handleSearch({ [name]: value })
  }

  componentDidMount() {}
  render() {
    return (
      <div className="input-group md-form form-sm form-2 pl-0">
        {/* <select
          className="mdb-select"
          name="select_search"
          onChange={this.handleChange}
        >
          <option value="" disabled selected>
            Search by:
          </option>
          <option value="searchByFirstName">First Name</option>
          <option value="searchByLastName">Last Name</option>
        </select> */}

        <input
          className="form-control my-0 py-1 lime-border"
          type="text"
          placeholder="Search"
          aria-label="Search"
          name="name"
          label="Search members"
          onChange={this.handleChange}
        />
        <div className="input-group-append">
          <span className="input-group-text lime lighten-2" id="basic-text1">
            <i className="fa fa-search text-grey" aria-hidden="true" />
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {}
}

export default connect(
  mapStateToProps,
  {}
)(SearchBar)
