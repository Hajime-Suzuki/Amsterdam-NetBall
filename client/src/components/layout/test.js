import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link, Route, Redirect } from "react-router-dom"
import { withRouter } from "react-router"
import { styles } from "./MenuLayoutStyle"
import LandingPage from "../login/LandingPage"
import SignupPageMaster from "../signup/SignupPageMaster"
import LogoutPage from "../logout/LogoutPage"
import HomePage from "../session/HomePage"
import MyDrives from "../session/MyDrives"
import Account from "../session/Account"
import Access from "../session/Access"
import Administration from "../session/Administration"
import { getRentee } from "../../actions/users"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import Typography from "material-ui/Typography"
// import TextField from '@material-ui/core/TextField'
// import MenuItem from '@material-ui/core/MenuItem'
import classNames from "classnames"
import Button from "material-ui/Button"
import AccountIcon from "material-ui-icons/AccountBox"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { withStyles } from "@material-ui/core/styles"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import Grid from "@material-ui/core/Grid"
import Hidden from "@material-ui/core/Hidden"

class MenuLayout extends PureComponent {
  state = {
    open: false,
    anchor: "left"
  }

  componentDidMount() {
    this.props.getRentee()
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
    const { history, classes } = this.props
    const { anchor, open } = this.state

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
            {classes.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.listItem}>
          <Link to={`/home`} onClick={this.handleDrawerClose}>
            Home
          </Link>
        </List>
        <Divider />
        <List className={classes.listItem}>
          <Link to={`/drives`} onClick={this.handleDrawerClose}>
            Uw Ritten
          </Link>
        </List>
        <Divider />
        <List className={classes.listItem}>
          <Link to={`/access`} onClick={this.handleDrawerClose}>
            Kluis Toegang
          </Link>
        </List>
        <Divider />
        <List className={classes.listItem}>
          <Link to={`/account`} onClick={this.handleDrawerClose}>
            Account Gegevens
          </Link>
        </List>
        <Divider />
        <List className={classes.listItem}>
          <Link to={`/administration`} onClick={this.handleDrawerClose}>
            Administratie
          </Link>
        </List>
        <Divider />
        <List className={classes.listItem}>
          <Link to={`/logout`} onClick={this.handleDrawerClose}>
            Uitloggen
          </Link>
        </List>
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
      <Grid>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton
                  // , open && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>

              <Hidden only="xs">
                <Typography variant="title" color="inherit" noWrap>
                  DriveSociety
                </Typography>

                <Typography
                  variant="title"
                  color="inherit"
                  style={{ flex: 1 }}
                />

                <Typography
                  variant="title"
                  color="inherit"
                  style={{ flex: 1 }}
                />
                <Button color="inherit" onClick={() => history.push("/info")}>
                  Hulp
                </Button>
                <IconButton
                  color="inherit"
                  onClick={() => history.push("/profile")}
                >
                  <AccountIcon />
                </IconButton>
              </Hidden>
              <Button color="inherit" onClick={() => history.push("/logout")}>
                Uitloggen
              </Button>
            </Toolbar>
          </AppBar>
          {before}
          <main
            className={classNames(
              classes.content,
              classes[`content-${anchor}`]
            )}
          >
            <Route exact path="/login" component={LandingPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPageMaster} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/drives" component={MyDrives} />
            <Route exact path="/access" component={Access} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/administration" component={Administration} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </main>

          {after}
        </div>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { getRentee }
  )(withStyles(styles)(MenuLayout))
)
