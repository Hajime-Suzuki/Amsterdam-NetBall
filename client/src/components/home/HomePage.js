import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// import { userId } from "../../jwt"

import "./HomePage.css"

class Homepage extends PureComponent {
  componentDidMount() {}
  render() {
    return (
      <div>
        <h1>Homepage is rendered</h1>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Homepage)
