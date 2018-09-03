import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Icon from '@material-ui/core/Icon'

const drawerItems = ({ anchor, open, classes, theme, history }) => {
  return (
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
          {theme.direction === 'rtl' ? (
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
            history.push('/members')
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
            history.push('/events')
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
            history.push('/logout')
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
}

export default drawerItems
