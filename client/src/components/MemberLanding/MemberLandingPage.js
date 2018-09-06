import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Row, Col, Input, Button } from "mdbreact"
import { login } from "../../redux/actions/users"
import { Redirect } from "react-router-dom"
import Search from "../search/Search"
import { getMembers } from "../../redux/actions/members"
import { getActivities } from "../../redux/actions/activities"
import { Icon } from "@material-ui/core"
import Divider from "@material-ui/core/Divider"

// import { userId } from "../../jwt"

import ActivityListComponent from "../admin/ActivityListComponent"
class MemberLandingPage extends PureComponent {
  state = {}

  componentDidMount() {
    this.props.getMembers()
  }

  handleSubmit = data => {
    this.props.createActivity(data)
  }

  render() {
    const { members, currentUser } = this.props

    if (!currentUser) return <Redirect to="/" />

    if (!members) return "Loading"

    if (members) {

      const currentMember = members.find( member => member.id === currentUser.id)
      console.log('currentMember', currentMember)
      return (
        <Container className="container-fluid mt-1">
          <Row className="justify-content-md-center">
            <Col md="6" className="mb-5">
              <div className="jumbotron text-center">
                <img
                  src={require(`../../lib/images/amsterdam-netball-logo.png`)}
                  className="header-logo"
                  style={{ marginBottom: 50 }}
                />
                <h5 className=" font-bold mb-4">Profile and members</h5>
                <Divider />

                <Link to={`/members/${currentUser.id}`}>
                  <Button className="btn btn-info btn-block  btn-blue-grey my-4 ">
                    Personal profile
                  </Button>
                </Link>
                <Link to="/members/list">
                  <Button className="btn btn-info btn-block  btn-blue-grey my-4 ">
                    Check all members
                  </Button>
                </Link>

                <h5 className=" font-bold mb-4">Events</h5>
                <Divider />
                <Link to="/events">
                  <Button className="btn btn-info btn-block  btn-blue-grey my-4 ">
                    Games and events
                  </Button>
                </Link>

                <Link to="/activities">
                  <Button className="btn btn-info btn-block  btn-blue-grey my-4 ">
                    Volunteer activities
                  </Button>
                </Link>

                { currentMember && currentMember.committees && currentMember.committees.length > 0 &&
                <div>
                <h5 className=" font-bold mb-4">Your Committees</h5>
                <Divider />
                  { currentMember.committees.map( committee => 
                    <Link to={ `/committees/${committee.id}` }>
                      <Button className="btn btn-info btn-block  btn-blue-grey my-4 ">
                        { committee.name }
                      </Button>
                    </Link>
                  ) }
                </div>
                }

              </div>
            </Col>
          </Row>
          <ActivityListComponent />
        </Container>
      )

    }
  }
}

const mapStateToProps = function(state) {
  return {
    members:
      state.members === null ? null : Object.values(state.members.members),
    currentUser: state.currentUser
  }
}

export default connect(
  mapStateToProps,
  { getMembers, getActivities }
)(MemberLandingPage)
