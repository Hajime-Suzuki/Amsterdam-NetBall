import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Input, Button } from 'mdbreact'
import { login } from '../../redux/actions/users'
import { Redirect } from 'react-router-dom'
import './SearchBar.css'

class Filters extends PureComponent {
  state = {}

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
    this.props.handleChange({ positions: this.state.positions })
  }

  componentDidMount() {}
  render() {
    const { positionNames: posName } = this.props
    return (
      <Row>
        <Col>
          <p>Positions</p>
          {Object.keys(this.props.positionNames).map((key, i) => {
            return (
              <div className="custom-control custom-checkbox" key={i}>
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={key}
                  value={key}
                  name="positions"
                  onChange={this.props.handleChange}
                  checked={posName[key]}
                />
                <label className="custom-control-label" htmlFor={key}>
                  {key}
                </label>
              </div>
            )
          })}
        </Col>
        {/* <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="GA"
            name="GA"
            onChange={this.props.handleChange}
            checked={this.props.positionName.GA}
          />
          <label className="custom-control-label" htmlFor="GA">
            GA
            </label>
        </div>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="GS"
            name="GS"
            onChange={this.props.handleChange}
            checked={this.props.positionName.GS}
          />
          <label className="custom-control-label" htmlFor="GS">
            GS
            </label>
        </div>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="WA"
            name="WA"
            onChange={this.props.handleChange}
            checked={this.props.positionName.WA}
          />
          <label className="custom-control-label" htmlFor="WA">
            WA
            </label>
        </div>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="WD"
            name="WD"
            onChange={this.props.handleChange}
            checked={this.props.positionName.WD}
          />
          <label className="custom-control-label" htmlFor="WD">
            WD
            </label>
        </div>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="C"
            name="C"
            onChange={this.props.handleChange}
            checked={this.props.positionName.C}
          />
          <label className="custom-control-label" htmlFor="C">
            C
            </label>
        </div>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="GD"
            name="GD"
            onChange={this.props.handleChange}
            checked={this.props.positionName.GD}
          />
          <label className="custom-control-label" htmlFor="GD">
            GD
            </label>
        </div>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="GK"
            name="GK"
            onChange={this.props.handleChange}
            checked={this.props.positionName.GK}
          />
          <label className="custom-control-label" htmlFor="GK">
            GK
            </label>
        </div> */}
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
