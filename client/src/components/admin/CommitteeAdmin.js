import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  getAllCommittees,
  addCommittee,
  deleteCommittee
} from "../../redux/actions/committees"
import { Container, Row, Col } from "mdbreact"
import "./Dashboard.css"

class CommitteeAdmin extends PureComponent {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.addCommittee(this.state)
    this.setState({ body: "" })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  componentDidMount() {
    this.props.getAllCommittees()
  }

  render() {
    const { committees, deleteCommittee } = this.props
    if (this.props.committees === null) return ""
    return (
      <Container className="mt-2">
        <Row className="justify-content-md-center">
          <Col md="6">
            <h3 className=" text-center mb-4 mt-4">Committees</h3>
            <div className="dashboard-component card card-body border-light border rounded-2 p-3">
              <ul>
                {committees.map(committee => (
                  <li>
                    <Link to={`/committees/${committee.id}`}>
                      <span className="committee-name">{committee.name}</span>
                    </Link>
                    <button
                      className="committee-delete"
                      onClick={() => deleteCommittee(committee.id)}
                    >
                      &#10060;
                    </button>
                  </li>
                ))}
              </ul>
              <h5 className=" text-center mt-3 mb-3">Add a committee</h5>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="name"
                  id="committee-name"
                  className="form-control"
                  value={this.state.name !== undefined ? this.state.name : ""}
                  placeholder="Committee Name"
                  onChange={this.handleChange}
                />
                <br />
                <div style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    className="btn btn-blue-grey btn-lg ml-4 mr-4 mb-3"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    committees: state.committees === null ? null : state.committeeAdmin,
    currentUser: state.currentUser
  }
}

export default connect(
  mapStateToProps,
  { getAllCommittees, addCommittee, deleteCommittee }
)(CommitteeAdmin)
