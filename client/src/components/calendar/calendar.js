import { Col, Container, Row } from "mdbreact"
import moment from "moment"
import React, { PureComponent } from "react"
import BigCalendar from "react-big-calendar-like-google"
import "../../../node_modules/react-big-calendar-like-google/lib/css/react-big-calendar.css"
import { getEvents } from "./gcal"
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

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
