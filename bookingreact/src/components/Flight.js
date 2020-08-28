import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Flight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: "",
      destination: "",
      flightData: [],
      email: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount() {
    fetch("http://localhost:7003/flights/getflights")
      .then((response) =>
        response.json().catch((err) => {
          console.err(`'${err}' happened!`);
          return {};
        })
      )
      .then((json) => {
        console.log("parsed json: ", json);
        this.setState({ flightData: json });
      })
      .catch((err) => {
        console.log("fetch request failed: ", err);
      });
  }
  //remaining
  routeChange = (e) => {
    const a = prompt("This page will directly take u to the sign up page, If you are already a user log in to see status of your flights");
    if (a == 'CONFIRM') {
      let path = "/book/" + e.flightId;
      this.props.history.push(path);
    } else {
      window.location.reload();
    }
  };


  onLoginSubmit(e) {
    e.preventDefault();
    const Post = {
      email: this.state.email,
      password: this.state.password,
    };
    fetch("http://localhost:7002/bookings/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(Post)
    })
      .then((res) => res.json())
      .then((rems) => {
        console.log(rems);
        alert(`message: ${rems.message}`);
        if (rems.token) {
          let path = "/checkstatus";
          this.props.history.push(path);
        } else {
          alert("some error appeared!")
        }
      });
  }


  onSubmit(e) {
    e.preventDefault();
    const src = this.state.source.toLowerCase();
    const dest = this.state.destination.toLowerCase();

    fetch("http://localhost:7001/flights/" + src + "/" + dest)
      .then((response) =>
        response.json().catch((err) => {
          console.err(`'${err}' happened!`);
          return {};
        })
      )
      .then((json) => {
        // console.log("parsed json: ", json);
        this.setState({ flightData: json });
      })
      .catch((err) => {
        console.log("fetch request failed: ", err);
      });
  }

  render() {
    const flightList = this.state.flightData.map((flight) => (
      <tr key={flight._id}>
        <td>{flight.flightId}</td>
        <td>{flight.flightSource}</td>
        <td>{flight.flightDestination}</td>
        <td>{flight.flightArrival}</td>
        <td>{flight.flightDeparture}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => this.routeChange(flight)}
          >
            Book
          </button>
        </td>
      </tr>
    ));

    const mystyle = {
      width: "50%",
      height: "50%"
    };

    return (

      <div className="container-sm w-95">

        <br />
        <div className="d-flex justify-content-between" >
          <img src={require("../img/img1.jpg")} className="rounded" style={{ height: "35%", width: "35%", justifyContent: "left" }} />
          <div>
            <form className="w-30" onSubmit={this.onSubmit} >
              <div>
                <label>Source</label>
                <input
                  type="text"
                  name="source"
                  placeholder="Source"
                  value={this.state.source}
                  className="form form-control"
                  onChange={this.onChange}
                />
              </div>
              <br />

              <div>
                <label>Destination :</label>
                <input
                  type="text"
                  name="destination"
                  placeholder="Destination"
                  value={this.state.destination}
                  className="form form-control"
                  onChange={this.onChange}
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary">
                Search
          </button>
            </form>
          </div>

          <div>
            <form className="w-30" onSubmit={this.onLoginSubmit} >
              <div>
                <label>Username</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Username"
                  value={this.state.email}
                  className="form form-control"
                  onChange={this.onChange}
                />
              </div>
              <br />

              <div>
                <label>Password :</label>
                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  className="form form-control"
                  onChange={this.onChange}
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary">
                Search
          </button>
            </form>
          </div>
        </div>
        <hr />
        <div>
          <table className="table table-dark">
            <thead>
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
          </table>
        </div>
      </div>
    );
  }
}
export default withRouter(Flight);
