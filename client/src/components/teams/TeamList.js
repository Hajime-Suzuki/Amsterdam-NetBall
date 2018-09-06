import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Container, Row, Col } from "mdbreact"
import { getTeams } from "../../redux/actions/teams"

class TeamList extends PureComponent {
  componentDidMount() {
    this.props.getTeams()
  }

  renderTeams = teams => {
    if (teams.length === 0) {
      return (
        <button className="list-group-item list-group-item-action waves-effect">
          There are no teams to display{" "}
        </button>
      )
    } else {
      return teams.map(team => (
        <div className="text-center mb-4">
          <h3
            className="list-group-item list-group-item-action waves-effect "
            style={{ backgroundColor: "#fff" }}
          >
            {team.name}
          </h3>

          {team.members.length > 0 && (
            <p className="list-group-item list-group-item-action waves-effect">
              {" "}
              {team.members.map(player => (
                <p>{player.firstName + " " + player.lastName + " "}</p>
              ))}
            </p>
          )}

          {team.members.length === 0 && (
            <p className="list-group-item list-group-item-action waves-effect">
              This team has no members yet
            </p>
          )}
        </div>
      ))
    }
  }

  render() {
    return (
      <Container className="container-fluid mt-1">
        <Row className="justify-content-md-center">
          <Col className="">
            <h2 className=" text-center">Current teams and players per team</h2>
            {this.renderTeams(this.props.teams)}
            <button
              className="list-group-item list-group-item-action waves-effect btn btn-info btn-block  btn-blue-grey my-4 text-center"
              onClick={() => this.props.history.push("/")}
            >
              Back to home
            </button>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    currentUser: state.currentUser,
    teams: Object.values(state.teams.teams)
  }
}
export default connect(
  mapStateToProps,
  { getTeams }
)(TeamList)
