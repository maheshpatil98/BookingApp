import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Flight from "./Flight";

class Booking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      number: "",
      Nationality: "",
      status: "Booked",
      email: "",
      password: "",
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
    const amt = this.props.match.params.amt;
    const Post = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      number: this.state.number,
      Nationality: this.state.Nationality,
      status: this.state.status,
      email: this.state.email,
      password: this.state.password
    };
    fetch("http://localhost:7002/bookings/add/" + id + "/" + amt, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Post),
    })
      .then((res) => res.json())
      .then((rems) => {
        console.log(rems);
        this.setState({ cheems: rems });
        alert(
          `Booked succesfully with booking ID ${this.state.cheems.bookId} and flight number ${this.state.cheems.flightID} please verify following details
          Status: ${this.state.cheems.status}, userId:${this.state.cheems.useridentification},first name : ${this.state.cheems.firstname}, last name: ${this.state.cheems.lastname} and phone no: ${this.state.cheems.number}`
        );
        let path = "/checkstatus/" + rems.useridentification;
        this.props.history.push(path);
      });
  }




  render() {

    const responseSuccessGoogle = (response) => {
      console.log(response);
    }

    const responseErrorGoogle = (response) => {

    }

    return (

      // <div className="container-sm w-25">
      //   <br />
      //   <form className="card mr-auto" style={{ textAlign: "center", width: "30rem" }} onSubmit={this.onSubmit} >
      //     <div className="card-body " style={{ textAlign: "center", alignContent: "center", alignItems: "center" }}>
      //       <h5 className="card-title">Take first step towards your journey</h5>
      //       <h6 className="card-subtitle mb-2 text-muted">Sign up</h6>
      <div className="container-sm w-25" style={{ textAlign: "center", alignContent: "center", alignItems: "center" }}>
        <br />

        <form className="card mr-auto" style={{ textAlign: "center", width: "28rem" }} onSubmit={this.onSubmit} >
          <div className="card-body " style={{ textAlign: "center", alignContent: "center", alignItems: "center" }}>
            <h5 className="card-title">Take first step towards your journey</h5>
            <h6 className="card-subtitle mb-2 text-muted">Sign up</h6>
            <div className="form-group">
              <label>First Name</label>
              <br />
              <input
                type="text"
                name="firstname"
                required
                className="form-control"
                placeholder="First Name"
                pattern="[A-Za-z]{3,}"
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
                pattern="[A-Za-z]{3,}"
                required
                value={this.state.lastName}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <br />
              <input
                type="number"
                name="number"
                className="form-control"
                placeholder="Phone Number"
                pattern="{10}"
                required
                value={this.state.number}
                onChange={this.onChange}
              />
            </div>


            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>


            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={this.state.password}
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
                pattern="[A-Za-z]{3,}"
                required
                value={this.state.Nationality}
                onChange={this.onChange}
              />
            </div>
            <br />

            <div className="d-flex justify-content-between">
              <button className="btn btn-primary" type="submit">
                Submit
          </button>

              <div><GoogleLogin
                clientId="202410087490-282ont8hp7rojdt2b0cpnksn2oo043mf.apps.googleusercontent.com"
                buttonText="Login with google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
              /></div>
            </div>
          </div>
        </form>
        <br></br>
        <hr></hr>

      </div>
    );
  }
}

export default withRouter(Booking);
