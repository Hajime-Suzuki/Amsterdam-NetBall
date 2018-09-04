import request from "superagent"
const CALENDAR_ID = "info@amsterdamnetball.com"

const API_KEY = "AIzaSyDJlOidCp3Nc1RFl1Y8M1JczUpBKi8X0so"
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export function getEvents(callback) {
  request.get(url).end((err, resp) => {
    if (!err) {
      const events = []
      const dateEvents = []
      const dateTimeEvents = []
      const remainingEvents = []
      JSON.parse(resp.text).items.map(event => {
        if (event.status === "confirmed") {
          if (event.start.date) {
            dateEvents.push(event)
            console.log(new Date(event.start.date))
          } else if (event.start.dateTime) {
            dateTimeEvents.push(event)
            console.log(new Date(event.start.dateTime))
          } else {
            remainingEvents.push(event)
          }
        }
      })
      console.log(dateEvents)
      console.log(dateTimeEvents)
      console.log(remainingEvents)
      JSON.parse(resp.text).items.map(event => {
        if (event.start) {
          events.push({
            start: event.start.date || new Date(event.start.dateTime),
            end: event.end.date || new Date(event.end.dateTime),
            title: event.summary
          })
        }

        if (event.originalStartTime) {
          console.log("cancelled")
        }
      })
      callback(events)
    }
  })
}
