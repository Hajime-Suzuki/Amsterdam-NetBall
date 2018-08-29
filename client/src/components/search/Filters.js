import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { login } from "../../redux/actions/users"
import { Redirect } from "react-router-dom"
import "./SearchBar.css"

class Filters extends PureComponent {
  state = {
    GA: false,
    GS: false,
    WA: false,
    WD: false,
    C: false,
    GD: false,
    GK: false,
    positions: []
  }

  handleChange = async event => {
    const { name } = event.target

    await this.setState({
      [name]: !this.state[name]
    })

    if (this.state[name]) {
      this.state.positions.push(name)
    } else if (!this.state[name]) {
      const positionIndex = this.state.positions.indexOf(name)
      this.state.positions.splice(positionIndex, 1)
    }
    this.props.handleSearch({ positions: this.state.positions })
  }

  componentDidMount() {}
  render() {
    return (
      <Row>
        <Col>
          <p>Positions</p>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="GA"
              name="GA"
              onChange={this.handleChange}
              checked={this.state.GA}
            />
            <label class="custom-control-label" htmlFor="GA">
              GA
            </label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="GS"
              name="GS"
              onChange={this.handleChange}
              checked={this.state.GS}
            />
            <label class="custom-control-label" htmlFor="GS">
              GS
            </label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="WA"
              name="WA"
              onChange={this.handleChange}
              checked={this.state.WA}
            />
            <label class="custom-control-label" htmlFor="WA">
              WA
            </label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="WD"
              name="WD"
              onChange={this.handleChange}
              checked={this.state.WD}
            />
            <label class="custom-control-label" htmlFor="WD">
              WD
            </label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="C"
              name="C"
              onChange={this.handleChange}
              checked={this.state.C}
            />
            <label class="custom-control-label" htmlFor="C">
              C
            </label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="GD"
              name="GD"
              onChange={this.handleChange}
              checked={this.state.GD}
            />
            <label class="custom-control-label" htmlFor="GD">
              GD
            </label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="GK"
              name="GK"
              onChange={this.handleChange}
              checked={this.state.GK}
            />
            <label class="custom-control-label" htmlFor="GK">
              GK
            </label>
          </div>
        </Col>
        {/* <Col>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="defaultChecked2"
              checked
            />
            <label class="custom-control-label" htmlFor="defaultChecked2">
              Default checked
            </label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="defaultChecked2"
              checked
            />
            <label class="custom-control-label" htmlFor="defaultChecked2">
              Default checked
            </label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="defaultChecked2"
              checked
            />
            <label class="custom-control-label" htmlFor="defaultChecked2">
              Default checked
            </label>
          </div>
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="defaultChecked2"
              checked
            />
            <label class="custom-control-label" htmlFor="defaultChecked2">
              Default checked
            </label>
          </div>
        </Col> */}
      </Row>
    )
  }
}

const mapStateToProps = function(state) {
  return {}
}

export default connect(
  mapStateToProps,
  {}
)(Filters)
