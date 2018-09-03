import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Redirect, Route, Switch } from 'react-router-dom'
import AdminRoute from '../../private/Admin'
import EventsCalendar from '../calendar/calendar'
import CommitteePage from '../committees/CommitteePage'
import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import LogoutPage from '../logout/LogoutPage'
import MemberLandingPage from '../MemberLanding/MemberLandingPage'
import MemberListComponent from '../members/MembersListComponent'
import MembersProfilePage from '../members/MembersProfilePage'
import SignupPage from '../signup/SignupPage'
import drawerItems from './drawerItems'
import drawerStyle from './styles/drawerStyle'

class PersistentDrawer extends PureComponent {
  state = {
    open: false,
    anchor: 'left'
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value
    })
  }

  render() {
    const { classes, theme, history, currentUser } = this.props
    const { anchor, open } = this.state

    let before = null
    let after = null

    const drawer = drawerItems({ anchor, open, classes, theme, history })

    if (anchor === 'left') {
      before = drawer
    } else {
      after = drawer
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open
            })}
            style={{ backgroundColor: '#000' }}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Netball App
              </Typography>
              {currentUser && (
                <Button color="inherit">
                  {/* <AccountIcon /> */}
                  Logged In
                </Button>
              )}
            </Toolbar>
          </AppBar>
          {before}{' '}
          <main
            className={classNames(
              classes.content,
              classes[`content-${anchor}`],
              {
                [classes.contentShift]: open,
                [classes[`contentShift-${anchor}`]]: open
              }
            )}
          >
            <Switch>
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/logout" component={LogoutPage} />
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/events" component={EventsCalendar} />
              <Route exact path="/members/:id" component={MembersProfilePage} />
              <Route exact path="/members" component={MemberLandingPage} />
              <Route exact path="/committees/:id" component={CommitteePage} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </Switch>
            <Switch>
              <AdminRoute
                path="/admin/members"
                component={MemberListComponent}
              />
            </Switch>
            {/* <MemberLandingPage /> */}
            {/* <Typography>
              {"You think water moves fast? You should see ice."}
            </Typography> */}
          </main>
          {after}
        </div>
      </div>
    )
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(withStyles(drawerStyle, { withTheme: true })(PersistentDrawer))
)
