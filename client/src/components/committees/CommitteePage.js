import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { getCommittee, deleteMessage, editMessage, addMessage } from "../../redux/actions/committees"
import AddMessageForm from './AddMessageForm.js'
import './CommitteePage.css'
// import { userId } from "../../jwt"

class CommitteePage extends PureComponent {
  state = {
    pendingEdit: 0
  }

  componentDidMount() {
    this.props.getCommittee(this.props.match.params.id)
  }

  editInPlace = messageId => {
    this.state.pendingEdit = messageId
    this.forceUpdate()
  }

  editTheMessage = (updates, committeeId, messageId) => {
    this.setState({ pendingEdit: 0 })
    this.props.editMessage(updates, committeeId, messageId)
  }

  renderMessages = (messages, pendingEdit) => {

    const _this = this
    console.log('pendingEdit', pendingEdit)
    return messages.map(message => {
      if (pendingEdit === message.id) {
        return <AddMessageForm key={message.id} committeeId={this.props.match.params.id} submitFunction={this.editTheMessage} initialValues={message} messageId={message.id} />
      }
      else {
        return (<div key={message.id} className={'committee-message mt-1 mb-1 p-3 rounded'}>
          <p className="committee-message-member mb-1">{`${message.member.firstName} ${message.member.lastName}`}</p>
          <p className="committee-message-body mb-1">{message.body}</p>
          { this.props.currentUser.id === message.member.id &&
            <div>
              <button onClick={ ()=>this.editInPlace(message.id) } className="edit-message">Edit</button><button onClick={ ()=>this.props.deleteMessage(this.props.match.params.id, message.id) } className="delete-message">Delete</button>
            </div>
          }
        </div>)
      }
    })
  }

  render() {
    const { committee } = this.props

    if (committee === null) return "Loading..."

    console.log('rendering')
    // console.log('committee.messages', committee.messages)
    // console.log('this.props.currentUser', this.props.currentUser)

    return (
      <Container>
        <div>
          <h1>{committee.name}</h1>
          <div>
            {committee.messages && this.renderMessages(committee.messages, this.state.pendingEdit) }
          </div>
        </div>
        <AddMessageForm committeeId={this.props.match.params.id} submitFunction={this.props.addMessage} />
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    committee: state.committee === null ? null : state.committee,
    currentUser: state.currentUser
  }
}

export default connect(
  mapStateToProps,
  { getCommittee, deleteMessage, editMessage, addMessage }
)(CommitteePage)
