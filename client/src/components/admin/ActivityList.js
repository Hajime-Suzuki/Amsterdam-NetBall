import React from 'react'

const ActivityList = ({ activities }) => {
  if (!activities.length) return null
  return activities.map(act => {
    const members = act.members.map(m => {
      return (
        <p key={m.id}>
          {m.firstName} {m.lastName}
        </p>
      )
    })

    return (
      <div key={act.id}>
        <p>{act.name}</p>
        <p>{members}</p>
        <p>===</p>
      </div>
    )
  })
}

export default ActivityList
