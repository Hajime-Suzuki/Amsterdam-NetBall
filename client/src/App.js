import React, { Component } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import LoginPage from "./components/login/LoginPage"
import SignupPage from "./components/signup/SignupPage"
import LogoutPage from "./components/logout/LogoutPage"
import HomePage from "./components/home/HomePage"
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "../node_modules/mdbreact/docs/css/mdb.min.css"
import AdminRoute from "./private/Admin"
import MemberListComponent from "./components/members/MembersListComponent"
import { Switch } from "react-router-dom"
import MemberLandingPage from "./components/MemberLanding/MemberLandingPage"
import MembersProfilePage from "./components/members/MembersProfilePage"
import EventsCalendar from "./components/calendar/calendar"
import CommitteePage from "./components/committees/CommitteePage"
import PersistentDrawer from "./components/layout/PersistentDrawer"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <PersistentDrawer props={this.props} />
          </nav>
        </div>
      </Router>
    )
  }
}

export default App
