import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { getCommittee, deleteMessage } from "../../redux/actions/committees"
import AddMessageForm from './AddMessageForm.js'
import './CommitteePage.css'
// import { userId } from "../../jwt"

class CommitteePage extends PureComponent {
  state = {}

  componentDidMount() {
    this.props.getCommittee(this.props.match.params.id)
  }

  renderMessages = messages => {
    return messages.map(message => (

      <div key={message.id} className={'committee-message mt-1 mb-1 p-3 rounded'}>
        <p className="committee-message-member mb-1">{`${message.member.firstName} ${message.member.lastName}`}</p>
        <p className="committee-message-body mb-1">{message.body}</p>
        { this.props.currentUser.id === message.member.id &&
          <div>
            <button className="edit-message">Edit</button><button onClick={() => this.props.deleteMessage(this.props.match.params.id, message.id) } className="delete-message">Delete</button>
          </div>
        }
      </div>
    ))
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
            {committee.messages && this.renderMessages(committee.messages)}
          </div>
        </div>
        <AddMessageForm committeeId={this.props.match.params.id} />
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
  { getCommittee, deleteMessage }
)(CommitteePage)
