import React, { PureComponent } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { Switch } from "react-router-dom"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import HomePage from "../home/HomePage"
import LoginPage from "../login/LoginPage"
import LogoutPage from "../logout/LogoutPage"
import SignupPage from "../signup/SignupPage"
import EventsCalendar from "../calendar/calendar"
import MembersProfilePage from "../members/MembersProfilePage"
import CommitteePage from "../committees/CommitteePage"
import AdminRoute from "../../private/Admin"
import MemberListComponent from "../members/MembersListComponent"
import { withRouter } from "react-router"
import Icon from "@material-ui/core/Icon"
import { Link } from "react-router-dom"

import MemberLandingPage from "../MemberLanding/MemberLandingPage"

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    height: "auto",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    position: "absolute",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "appBarShift-left": {
    marginLeft: drawerWidth
  },
  "appBarShift-right": {
    marginRight: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  "content-left": {
    marginLeft: -drawerWidth
  },
  "content-right": {
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "contentShift-left": {
    marginLeft: 0
  },
  "contentShift-right": {
    marginRight: 0
  }
})

class PersistentDrawer extends PureComponent {
  state = {
    open: false,
    anchor: "left"
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
    const { classes, theme, history } = this.props
    const { anchor, open } = this.state

    console.log(history)

    const drawer = (
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              history.push("/members")
              this.handleDrawerClose()
            }}
          >
            <ListItemIcon>
              <Icon className="fa fa-home" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push("/events")
              this.handleDrawerClose()
            }}
          >
            <ListItemIcon>
              <Icon className="fa fa-calendar" />
            </ListItemIcon>

            <ListItemText primary="Upcoming events" />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => {
              history.push("/logout")
              this.handleDrawerClose()
            }}
          >
            <ListItemIcon>
              <Icon className="fa fa-sign-out" />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    )

    let before = null
    let after = null

    if (anchor === "left") {
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
            style={{ backgroundColor: "#000" }}
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
            </Toolbar>
          </AppBar>
          {before}{" "}
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
    // currentUser: state.currentUser
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(withStyles(styles, { withTheme: true })(PersistentDrawer))
)
