import React, {PureComponent} from 'react'
import {addMessage} from '../../redux/actions/committees'
import {connect} from 'react-redux'

class AddMessageForm extends PureComponent {

  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addMessage(this.state, this.props.committeeId)
    this.setState({ body: '' })
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    const initialValues = this.props.initialValues || {}
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="text-center p-5">
          <label htmlFor="body" style={{ textAlign: "left" }}>Add a message:</label><br/>
          <textarea id="body" className="form-control rounded-0" name="body" rows="4" columns="50" maxLength="200" wrap="hard" value={
            this.state.body !== undefined ? this.state.body : initialValues.body
          } onChange={ this.handleChange } />
        </div>
        <button className="btn" style={{ color: 'red', margin: '0 auto', display: 'block' }} type="submit">Send</button>
      </form>
    )

  }

}

export default connect(null, { addMessage })( AddMessageForm )