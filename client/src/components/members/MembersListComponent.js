import React, { PureComponent } from "react"

import { connect } from "react-redux"
import { getUsers } from "../../redux/actions/users"

class MemberListComponent extends PureComponent {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">zvmc#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

const mapSateToProps = state => ({
  members: state.members
})

export default connect(
  mapSateToProps,
  { getUsers }
)(MemberListComponent)
