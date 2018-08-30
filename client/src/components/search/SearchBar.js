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

  handleChange = async event => {
    const { name, value } = event.target

    this.setState(
      {
        [name]: value
      },
      () => this.props.handleSearch(this.state)
    )
  }

  componentDidMount() {}
  render() {
    return (
      <div className="input-group md-form form-sm form-2 pl-0">
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
