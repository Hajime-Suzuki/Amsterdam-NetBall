import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Container } from "mdbreact"
import {
  getCommittee,
  deleteMessage,
  editMessage,
  addMessage
} from "../../redux/actions/committees"
import AddMessageForm from "./AddMessageForm.js"
import "./CommitteePage.css"
import dateFormat from "dateformat"

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
    console.log("pendingEdit", pendingEdit)
    return messages.map(message => {
      if (pendingEdit === message.id) {
        return (
          <AddMessageForm
            key={message.id}
            committeeId={this.props.match.params.id}
            submitFunction={this.editTheMessage}
            initialValues={message}
            messageId={message.id}
          />
        )
      } else {
        const messageDate = new Date(message.created_at)
        const correctedMessageDate = messageDate.setHours(messageDate.getHours()+4)
        const messageTimestamp = dateFormat(correctedMessageDate, "m/d/yy H:MM")
        const canEdit = this.props.currentUser.id === message.member.id
        const canDelete = canEdit || this.props.currentUser.role === 'admin'
        return (
          <div key={message.id} className={'committee-message mt-0 p-3 border border-light rounded'}>
          <p className="committee-message-member mb-1">
            {`${message.member.firstName} ${message.member.lastName}`} 
            <span className="message-timestamp">{ `${messageTimestamp}` }</span>
            { canEdit &&
              <span><button onClick={ ()=>this.editInPlace(message.id) } className="edit-message">&#9998;</button></span> }
            { canDelete &&
              <span><button onClick={ ()=>this.props.deleteMessage(this.props.match.params.id, message.id) } className="delete-message">&#10060;</button></span> }
          </p>
          <p className="committee-message-body mb-1">{message.body}</p>
          </div>
        )
      }
    })
  }

  render() {
    const { committee, addMessage } = this.props

    if (committee === null) return "Loading..."

    return (
      <Container>
        <div id={"committee-container"}>
          <h1>{committee.name}</h1>
          <div>
            {committee.messages &&
              this.renderMessages(committee.messages, this.state.pendingEdit)}
          </div>
        </div>
        <AddMessageForm
          committeeId={this.props.match.params.id}
          submitFunction={addMessage}
        />
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
