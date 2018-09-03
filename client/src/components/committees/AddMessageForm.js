import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

class AddMessageForm extends PureComponent {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('this.state', this.state, 'this.props.committeeId', this.props.committeeId)
    const messageId = this.props.messageId ? this.props.messageId : 0
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
    const placeholder = this.props.messageId ? "" : "Post a new message"
    const submitLabel = this.props.messageId ? "Save" : "submit"
    return (
      <form onSubmit={this.handleSubmit} id={'committee-form'}>
        <div className="text-center p-0">
          <textarea id="body" className="form-control rounded-0 border-light" placeholder={placeholder} name="body" rows="4" columns="50" maxLength="200" wrap="hard" value={
            this.state.body !== undefined ? this.state.body : initialValues.body
          } onChange={ this.handleChange } />
        </div>
        <button className="btn" style={{ color: 'red', margin: '0 auto', display: 'block' }} type="submit">{submitLabel}</button>
      </form>
    )

  }

}

export default connect()( AddMessageForm )