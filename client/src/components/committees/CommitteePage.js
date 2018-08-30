import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { getCommittee } from "../../redux/actions/committees"
// import { userId } from "../../jwt"

class CommitteePage extends PureComponent {
  state = {}

  componentDidMount() {
    this.props.getCommittee(this.props.match.params.id)
  }

  renderMessages = messages => {
    return messages.map(message => (
      <div key={message.id}>
        <p>
          {message.body}
        </p>
      </div>
    ))
  }

  render() {
    const { committee } = this.props

    if (committee === null) return 'Loading...'

    return (
      <Container>
        <Row className="justify-content-md-center">
          <h1>{ committee.name }</h1>
          <Row>{committee.messages && this.renderMessages(committee.messages)}</Row>
        </Row>
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
  { getCommittee }
)(CommitteePage)
