import React, { PureComponent } from 'react'

class MemberListComponent extends PureComponent {
  render() {
    console.log('memberlist', this.props)
    return <div>Member!</div>
  }
}

export default MemberListComponent
