import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Button } from "mdbreact"
import { getAllCommittees } from "../../redux/actions/committees"
import {
  addCommitteeToMember,
  removeCommitteeFromMember
} from "../../redux/actions/members"
import "./MembersProfilePage.css"
import Modal from "@material-ui/core/Modal"
import { withStyles } from "@material-ui/core/styles"

class MemberCommitteesModal extends PureComponent {
  toggleMemberCommittee(selectedCommittee, member) {
    const memberCommitteeIds = member.committees.map(committee => committee.id)

    if (memberCommitteeIds.includes(selectedCommittee.id)) {
      console.log("subtract")
      this.props.removeCommitteeFromMember(member.id, selectedCommittee.id)
    } else {
      console.log("add")
      this.props.addCommitteeToMember(member.id, selectedCommittee.id)
    }
  }

  componentDidMount() {
    this.props.getAllCommittees()
  }

  render() {
    const {
      committeesModalOpen,
      handleClose,
      getModalStyle,
      classes,
      committees,
      member
    } = this.props
    const memberCommitteeIds = member.committees.map(committee => committee.id)
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={committeesModalOpen}
        id="member-committees-modal"
      >
        <div style={getModalStyle()} className={classes.paper}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Committee Assignments
              </h5>
            </div>

            {committees && (
              <ul className="committee-assignments">
                {committees.map(committee => {
                  const memberStatus = memberCommitteeIds.includes(committee.id)
                    ? "on-committee"
                    : "not-on-committee"
                  return (
                    <li
                      key={committee.id}
                      onClick={() =>
                        this.toggleMemberCommittee(committee, member)
                      }
                      className={memberStatus}
                    >
                      <span className="committee-name">{committee.name}</span>
                      {memberCommitteeIds.includes(committee.id) ? (
                        <span className="committee-check">&#10004;</span>
                      ) : (
                        ""
                      )}
                    </li>
                  )
                })}
              </ul>
            )}

            <div className="modal-footer">
              <Button
                className="btn btn-info btn-block  btn-blue-grey my-4 "
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    committees: state.committees === null ? null : state.committeeAdmin,
    member: state.singleMember.member,
    currentUser: state.currentUser
  }
}

const styles = theme => ({
  paper: {
    position: "absolute",
    overflowY: "scroll",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getAllCommittees, addCommitteeToMember, removeCommitteeFromMember }
  )(MemberCommitteesModal)
)

// export default connect(mapStateToProps, { getAllCommittees })(MemberCommitteesModal)
