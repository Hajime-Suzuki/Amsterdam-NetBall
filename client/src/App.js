import React, { Component } from "react"
import { BrowserRouter as Router } from "react-router-dom"
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
