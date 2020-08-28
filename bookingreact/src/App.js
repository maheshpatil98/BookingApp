
import React, { Component } from 'react'
import { useHistory, withRouter, Redirect } from "react-router-dom"
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Flight from "./components/Flight";
import Booking from "./components/Booking";
import SearchId from "./components/Search/Search-flight";
import AddFlight from "./components/Admin/AddFlight";
import Home from "./components/Home";
import CheckStatus from "./components/Passenger/CheckStatus";
import BookingsInFlight from "./components/Admin/BookingsInFlight";

import {
  BrowserRouter as Router,
  Link,
  Route,
  NavLink,
} from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

// class App extends Component {



//   onSubmit(e) {
//     e.preventDefault();
//     let History = useHistory();
//     History.push("/flights/" + this.state.source + "/" + this.state.destination);
//   }

//   render() {

//   }
// }


class App extends Component {




  render() {




    return (
      <div>
        <Router>
          <Navbar bg="dark" variant="dark">
            <img src={require("./img/book.png")} className="rounded" style={{ height: "5vh", width: "5vh", margin: "5px 5px" }} />
            <Navbar.Brand href="http://localhost:3000">AirBooking.in</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="http://localhost:3000/flights">Flights</Nav.Link>
                <Nav.Link href="http://localhost:3000/login">Check-In</Nav.Link>
                <NavDropdown title="Search by" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Flight ID</NavDropdown.Item>
                  <NavDropdown.Item href="http://localhost:3000/search/id">
                    Booking ID
            </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav variant="pills" activeKey="1">
                <Nav.Link eventKey="2" href="http://localhost:3000/signup">SignUp</Nav.Link>
                <Nav.Link eventKey="1" href="http://localhost:3000/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/checkstatus">
            <CheckStatus />
          </Route>

          <Route path="/bookingsinflight">
            <BookingsInFlight />
          </Route>

          <Redirect exact from="/" to="/flights" component={<Flight />} />

          <Route def path="/flights" children={<Flight />} />


          <Route path="/book/:id" children={<Booking />} />

          <Route path="/search/:token" children={<SearchId />} />

          <Route path="/addflight/:id" children={<AddFlight />} />



        </Router>
      </div>
    )
  }
}

export default App;



/**
 * <thead>
                <tr>
                  <td>Flight Number</td>
                  <td>flight Source</td>
                  <td>flight Destination</td>
                  <td>flight Arrival</td>
                  <td>flight Departure</td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
              <tbody>{flightList}</tbody>
 */
