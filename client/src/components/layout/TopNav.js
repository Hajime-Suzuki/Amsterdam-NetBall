import React, { PureComponent } from 'react'

import { withRouter } from 'react-router'
// import { userId } from "../../jwt"
import { connect } from 'react-redux'
// import { getUsers } from "../../actions/users"
import { Link } from 'react-router-dom'
import './TopNav.css'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

class TopNav extends PureComponent {
  componentDidMount() {}
  render() {
    const { location, history, user, currentUser, signup } = this.props
    return (
      <AppBar
        position="absolute"
        style={{ zIndex: 10, backgroundColor: '#101010' }}
      >
        <Toolbar className="media">
          <Typography variant="title" color="inherit" style={{ flex: 1 }}>
            <Link className="link" to="/home">
              <img
                src={require(`../../lib/images/amsterdam-netball-logo.png`)}
                className="header-logo"
              />
            </Link>
          </Typography>
          {user && <Button color="inherit" />}

          {currentUser &&
            currentUser.role === 'admin' && (
              <Link to="/admin/members">
                <Button color="secondary">Members</Button>
              </Link>
            )}

          {currentUser && <Button color="inherit">BALR. IS LOGGED IN!</Button>}

          {currentUser && <Button color="inherit">BALR. IS LOGGED IN!</Button>}

          {location.pathname.indexOf('signup') > 0 && (
            <Button color="inherit" onClick={() => history.push('/login')}>
              Login
            </Button>
          )}
          {location.pathname.indexOf('login') > 0 && (
            <Button color="inherit" onClick={() => history.push('/signup')}>
              Sign up
            </Button>
          )}

          {(currentUser || location.pathname.indexOf('home') > 0) && (
            <Button color="inherit" onClick={() => history.push('/logout')}>
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = state => ({
  // user:
  //   state.currentUser &&
  //   state.users &&
  //   state.users[userId(state.currentUser.jwt)],
  currentUser: state.currentUser
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      // getUsers
    }
  )(TopNav)
)
