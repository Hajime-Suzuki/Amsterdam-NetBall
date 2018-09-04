import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getAllCommittees, addCommittee } from "../../redux/actions/committees"
import './Dashboard.css'

class CommitteeAdmin extends PureComponent {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addCommittee(this.state)
    this.setState({ body: '' })
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  componentDidMount() {
    this.props.getAllCommittees()
  }

  render() {
    const { committees } = this.props
    if (this.props.committees === null) return ""
    return (
      <div className="dashboard-component border-light border rounded-2 p-3" >
        <h4>Committees</h4>
        <ul>
          {
            committees.map(committee =>
              <li>
              <Link  to={`/committees/${committee.id}`}><span className="committee-name">{ committee.name }</span></Link>
              <span className="committee-description">{ committee.description }</span>
              </li>
            )
          }
        </ul>

        <h6>Add a committee</h6>
        <form onSubmit={this.handleSubmit} >
          <input type="text" name="name" id="committee-name" value={ this.state.name !== undefined ? this.state.name : ''} placeholder="Committee Name" onChange={ this.handleChange } /><br/>
          <input type="text" name="description" id="committee-description" value={ this.state.description !== undefined ? this.state.description : ''} placeholder="Committee Description" onChange={ this.handleChange } /><br/>
          <button type="submit">Submit</button>
        </form>


      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    committees: state.committees === null ? null : state.committeeAdmin,
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, { getAllCommittees, addCommittee })(CommitteeAdmin)
