import React, { PureComponent } from "react"
import Calendar from "react-calendar"
import { getEvents } from "./gcal"
import moment from "moment"
import "../../../node_modules/react-big-calendar-like-google/lib/css/react-big-calendar.css"
import BigCalendar from "react-big-calendar-like-google"
import { Container, Row, Col } from "mdbreact"
<<<<<<< HEAD

=======
>>>>>>> b78a6b770953843defa217b89f85ba7004febe80
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
// a localizer for BigCalendar
BigCalendar.momentLocalizer(moment)
<<<<<<< HEAD

=======
>>>>>>> b78a6b770953843defa217b89f85ba7004febe80
class EventsCalendar extends PureComponent {
  state = {
    date: new Date(),
    events: []
  }
  componentDidMount() {
    getEvents(events => {
      this.setState({ events })
    })
  }
<<<<<<< HEAD

=======
>>>>>>> b78a6b770953843defa217b89f85ba7004febe80
  onChange = date => this.setState({ date })
  render() {
    return (
      <Container className="mt-5">
        <Row className="justify-content-md-center mt-2">
          <h2>Netball matches and activities overview</h2>
        </Row>
        <Col
        // className=" col-md-auto"
        >
          <BigCalendar
            events={this.state.events}
            defaultDate={new Date()}
            defaultView="agenda"
            style={{
              height: "100vh",
              width: "auto"
            }}
          />
        </Col>
      </Container>
    )
  }
}
export default EventsCalendar