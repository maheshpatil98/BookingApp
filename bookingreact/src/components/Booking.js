import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";

class Booking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      number: "",
      // dob: "",
      Nationality: "",
      status: "Booked",
      cheems: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange = (date) => {
    this.setState({
      dob: date.toString(),
    });
  };

  onSubmit(e) {
    e.preventDefault();
    const id = this.props.match.params.id;
    const Post = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      number: this.state.number,
      // dob: this.state.dob,
      Nationality: this.state.Nationality,
      status: this.state.status,
    };
    fetch("http://localhost:7002/bookings/" + id, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Post),
    })
      .then((res) => res.json())
      .then((rems) => {
        console.log(rems);
        this.setState((this.state.cheems = rems));
        alert(
          `Booked succesfully with booking ID ${this.state.cheems.bookId} and flight number ${this.state.cheems.flightID} please verify following details
          Status: ${this.state.cheems.status}, first name : ${this.state.cheems.firstname}, last name: ${this.state.cheems.lastname} and phone no: ${this.state.cheems.number}`
        );
      });
  }

  render() {
    return (
      <div className="container-sm w-50">
        <hr />
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <br />
            <input
              type="text"
              name="firstname"
              required
              className="form-control"
              placeholder="First Name"
              // pattern="[A-Za-z]{3,}"
              value={this.state.firstName}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>last Name</label> <br />
            <input
              type="text"
              name="lastname"
              className="form-control"
              placeholder="Last Name"
              // pattern="[A-Za-z]{3,}"
              required
              value={this.state.lastName}
              onChange={this.onChange}
            />
          </div>

          {/* <div className="form-group">
            <label>Date of Birth</label>
            <br />
            <DatePicker
              locale="es"
              dateFormat="yyyy-mm-dd"
              selected={this.state.dob}
              onChange={this.handleChange}
            />
          </div> */}

          <div className="form-group">
            <label>Phone Number</label>
            <br />
            <input
              type="number"
              name="number"
              className="form-control"
              placeholder="Phone Number"
              //  pattern="{10}"
              required
              value={this.state.number}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Nationality</label>
            <br />
            <input
              type="text"
              name="Nationality"
              className="form-control"
              placeholder="Enter your country"
              //    pattern="[A-Za-z]{3,}"
              required
              value={this.state.Nationality}
              onChange={this.onChange}
            />
          </div>
          <br />

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        <br></br>
        <hr></hr>
      </div>
    );
  }
}

export default withRouter(Booking);
