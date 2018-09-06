import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'

const drawerItems = ({
  anchor,
  open,
  classes,
  theme,
  history,
  handleDrawerClose,
  handleDrawerOpen,
  currentUser
}) => {
  return (
    <Drawer
      variant="persistent"
      anchor={anchor}
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      {console.log(handleDrawerClose)}
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {currentUser && (
          <ListItem
            button
            onClick={() => {
              history.push('/members')
              handleDrawerClose()
            }}
          >
            <ListItemIcon>
              <Icon className="fa fa-home" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        )}

        {currentUser && (
          <ListItem
            button
            onClick={() => {
              history.push(`/members/${currentUser.id}`)
              handleDrawerClose()
            }}
          >
            <ListItemIcon>
              <Icon className="fa fa-user" />
            </ListItemIcon>
            <ListItemText primary="Personal profile" />
          </ListItem>
        )}

        {currentUser && (
          <ListItem
            button
            onClick={() => {
              history.push(`/members/list`)
              handleDrawerClose()
            }}
          >
            <ListItemIcon>
              <Icon className="fa fa-users" />
            </ListItemIcon>
            <ListItemText primary="Members" />
          </ListItem>
        )}

        {currentUser && (
          <ListItem
            button
            onClick={() => {
              history.push('/teams')
              handleDrawerClose()
            }}
          >
            <ListItemIcon>
              <Icon className="fa fa-users" />
            </ListItemIcon>

            <ListItemText primary="Teams overview" />
          </ListItem>
        )}

        {currentUser && (
          <ListItem
            button
            onClick={() => {
              history.push('/activities')
              handleDrawerClose()
            }}
          >
            <ListItemIcon>
              <Icon className="fa fa-calendar" />
            </ListItemIcon>

            <ListItemText primary="Volunteer activities" />
          </ListItem>
        )}

        <ListItem
          button
          onClick={() => {
            history.push('/events')
            handleDrawerClose()
          }}
        >
          <ListItemIcon>
            <Icon className="fa fa-calendar" />
          </ListItemIcon>

          <ListItemText primary="Upcoming events" />
        </ListItem>

        {currentUser &&
          currentUser.role === 'admin' && (
            <div>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  history.push(`/admin/`)
                  handleDrawerClose()
                }}
              >
                <ListItemIcon>
                  <Icon className="fa fa-user-secret" />
                </ListItemIcon>
                <ListItemText primary="Admin dashboard" />
              </ListItem>
            </div>
          )}
        <Divider />
        {currentUser ? (
          <ListItem
            button
            onClick={() => {
              history.push('/logout')
              handleDrawerClose()
            }}
          >
            <ListItemIcon>
              <Icon className="fa fa-sign-out" />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        ) : (
          <ListItem
            button
            onClick={() => {
              history.push('/signup')
              handleDrawerClose()
            }}
          >
            <ListItemIcon>
              <Icon className="fas fa-user-plus" />
            </ListItemIcon>
            <ListItemText primary="Sign up" />
          </ListItem>
        )}
      </List>
      {!currentUser && (
        <ListItem
          button
          onClick={() => {
            history.push(`/home`)
            handleDrawerClose()
          }}
        >
          <ListItemIcon>
            <Icon className="fas fa-sign-in-alt" />
          </ListItemIcon>
          <ListItemText primary="Log in" />
        </ListItem>
      )}
      <Divider />
    </Drawer>
  )
}

// const mapStateToProps = state => ({
//   currentUser: state.currentUser
// })

export default drawerItems
