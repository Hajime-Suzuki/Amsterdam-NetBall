import React, { PureComponent } from "react"
import Calendar from "react-calendar"
import { getEvents } from "./gcal"
import moment from "moment"
import "../../../node_modules/react-big-calendar-like-google/lib/css/react-big-calendar.css"
import BigCalendar from "react-big-calendar-like-google"
import { Container, Row, Col } from "mdbreact"
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
// a localizer for BigCalendar
BigCalendar.momentLocalizer(moment)
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
  onChange = date => this.setState({ date })
  render() {
    return (
      <Container className="container-fluid">
        <Row className="justify-content-md-center mt-2">
          <h2>Netball matches and activities overview</h2>
        </Row>
        <Col className=" col-md-auto">
          <BigCalendar
            events={this.state.events}
            defaultDate={new Date()}
            defaultView="month"
            style={{ height: "100vh" }}
          />
        </Col>
      </Container>
    )
  }
}
export default EventsCalendar