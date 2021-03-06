
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
import { Provider } from "react-redux";
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
import Update from './components/Search/Update';
import store from "./Store";


class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <div >
          <Router>
            <Navbar bg="dark" variant="dark" className="mr-auto d-flex justify-content-between">
              <div>
                <img src={require("./img/book.png")} className="rounded" style={{ height: "9vh", width: "9vh", margin: "5px 5px" }} />
                <img src={require("./img/goair3.png")} className="rounded" style={{ height: "9vh", width: "25vh", margin: "5px 5px" }} />
              </div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <br />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="d-flex justify-content-between">
                  <NavLink to="/flights" style={{ textAlign: "center", margin: "5px 5px", fontSize: "15px" }} className="btn btn-outline-light" >Home</NavLink>
                  <div><hr></hr></div>
                  <NavLink to="/about" style={{ textAlign: "center", margin: "5px 5px" }} className="btn btn-outline-light">About Us</NavLink>
                </Nav>

              </Navbar.Collapse>
            </Navbar>


            <Route path="/login">
              <Login />
            </Route>


            <Route path="/signup">
              <Signup />
            </Route>


            <Route path="/checkstatus/:bookid" children={<CheckStatus />} />


            <Route path="/bookingsinflight/:id/:name" children={<BookingsInFlight />} />

            <Route exact path="/" >
              <Redirect to="/flights" />
            </Route>

            <Route path="/flights" children={<Flight />} />
            <Route path="/home" children={<Home />} />

            <Route path="/book/:id/:amt" children={<Booking />} />

            <Route path="/search/:token/:name" children={<SearchId />} />

            <Route path="/addflight/:id/:name" children={<AddFlight />} />
            <Route path="/update" children={<Update />} />




          </Router>

        </div>
      </Provider>
    )
  }
}

export default App;

