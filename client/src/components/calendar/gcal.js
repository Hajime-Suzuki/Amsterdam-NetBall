import request from "superagent"
const CALENDAR_ID = "iofehqekskfumq1r5asir9gs7g@group.calendar.google.com"
const API_KEY = "AIzaSyDJlOidCp3Nc1RFl1Y8M1JczUpBKi8X0so"
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export function getEvents(callback) {
  request.get(url).end((err, resp) => {
    if (!err) {
      const events = []
      console.log(resp)
      JSON.parse(resp.text).items.map(event => {
        events.push({
          start: event.start.date || new Date(event.start.dateTime),
          end: event.end.date || new Date(event.end.dateTime),
          title: event.summary
        })
      })
      callback(events)
    }
  })
}
