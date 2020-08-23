import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Login from './components/Login';
import Signup from './components/Signup';
import {BrowserRouter as Router, Link, Route, NavLink} from 'react-router-dom';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

function App() {
  return (
     <Router>
<div>
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Booking</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="http://localhost:3000/signup">SignUp</Nav.Link>
      <Nav.Link href="http://localhost:3000/login">Login</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav inline>
    <Nav.Link href="http://localhost:3000/signup">SignUp</Nav.Link>
      <Nav.Link href="http://localhost:3000/login">Login</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>  
         <Route path="/login">
            <Login/>
          </Route>

          <Route path="/signup">
            <Signup/>
          </Route> 

        
      </div>
     </Router>

  );
}

export default App;

