import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

class AddMessageForm extends PureComponent {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('this.state', this.state, 'this.props.committeeId', this.props.committeeId)
    const messageId = this.props.messageId ? this.props.messageId : 0
    console.log('messageId', messageId)
    this.props.submitFunction(this.state, this.props.committeeId, messageId)
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

export default connect()( AddMessageForm )