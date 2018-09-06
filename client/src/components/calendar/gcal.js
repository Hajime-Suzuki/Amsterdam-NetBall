import request from "superagent"
const CALENDAR_ID = "info@amsterdamnetball.com"

const API_KEY = "AIzaSyDJlOidCp3Nc1RFl1Y8M1JczUpBKi8X0so"
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export function getEvents(callback) {
  request.get(url).end((err, resp) => {
    if (!err) {
      const events = []

      JSON.parse(resp.text).items.map(event => {
        if (event.start) {
          events.push({
            start: event.start.date || new Date(event.start.dateTime),
            end: event.end.date || new Date(event.end.dateTime),
            title: event.summary
          })
        }
      })
      callback(events)
    }
  })
}
