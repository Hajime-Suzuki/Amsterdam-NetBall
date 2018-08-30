import React, { Component } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import LoginPage from "./components/login/LoginPage"
import SignupPage from "./components/signup/SignupPage"
import LogoutPage from "./components/logout/LogoutPage"
import HomePage from "./components/home/HomePage"
import logo from "./logo.svg"
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "../node_modules/mdbreact/docs/css/mdb.min.css"
import TopNav from "./components/layout/TopNav"
import AdminRoute from "./private/Admin"
import MemberListComponent from "./components/members/MembersListComponent"
import { Switch } from "react-router-dom"
import MemberLandingPage from "./components/MemberLanding/MemberLandingPage"
import MembersProfilePage from "./components/members/MembersProfilePage"
import CommitteePage from "./components/committees/CommitteePage"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopNav />
          </nav>

          <main style={{ marginTop: 75 }}>
            <Switch>
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/logout" component={LogoutPage} />
              <Route exact path="/signup" component={SignupPage} />
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
          </main>
        </div>
      </Router>
    )
  }
}

export default App
