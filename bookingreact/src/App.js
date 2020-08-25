import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Flight from "./components/Flight";
import Booking from "./components/Booking";
import { SearchId } from "./components/Search/Search-flight";
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

function App() {
  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Booking</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="http://localhost:3000/flights">Flights</Nav.Link>
              <Nav.Link href="http://localhost:3000/login">Login</Nav.Link>
              <NavDropdown title="Search by" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Flight ID
                </NavDropdown.Item>
                <NavDropdown.Item href="http://localhost:3000/search/id">
                  Booking ID
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="http://localhost:3000/signup">SignUp</Nav.Link>
              <Nav.Link href="http://localhost:3000/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/flights">
          <Flight />
        </Route>

        <Route path="/book/:id" children={<Booking />} />

        <Route path="/search/id">
          <SearchId />
        </Route>
      </div>
    </Router>
  );
}

export default App;
