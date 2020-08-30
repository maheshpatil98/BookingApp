import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

class SearchId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flightId: "",
      data: [{}],
      dataa: "",
      tokenn: this.props.match.params.token
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goingToAdd = this.goingToAdd.bind(this);
    this.goingToLogout = this.goingToLogout.bind(this);
    this.routeChangeDelete = this.routeChangeDelete.bind(this);
    this.goingToBookers = this.goingToBookers.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  goingToAdd() {
    let path = "/addflight/" + this.props.match.params.token;
    this.props.history.push(path);
  }

  goingToBookers() {
    let path = "/bookingsinflight/" + this.props.match.params.token;
    this.props.history.push(path);
  }

  goingToLogout() {
    this.setState({ tokenn: "" });
    let path = "/";
    this.props.history.push(path);
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
        this.setState({ data: json });
      })
      .catch((err) => {
        console.log("fetch request failed: ", err);
      });
  }

  routeChangeDelete(flight) {
    console.log(flight.flightId);
    fetch("http://localhost:7003/flights/" + flight.flightId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + this.state.tokenn
      }
    })
      .then((dat) => {
        console.log(dat);
        alert("Data deleted Successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  onSubmit(e) {
    e.preventDefault();

    const Post = {
      id: this.state.flightId,
    };
    fetch("http://localhost:7003/flights/search/" + this.state.flightId, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + this.state.tokenn
      },
    })
      .then((res) => res.json())
      .then((rems) => {
        console.log(rems);
        this.setState((this.state.data = rems));
      });
  }

  render() {
    const flightList = this.state.data.map((pass) => (
      <tr key={pass._id}>
        <td>{pass.flightId}</td>
        <td>{pass.flightSource}</td>
        <td>{pass.flightDestination}</td>
        <td>{pass.flightArrival}</td>
        <td>{pass.flightDeparture}</td>
        <td>{pass.flightStatus}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.routeChangeDelete(pass)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));




    return (
      <div className="container-sm w-90">

        <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#121212" }}>
          <button className="btn btn-secondary" style={{ margin: "10px 10px" }} onClick={this.goingToAdd} >Add Flight</button> <hr />
          <h4 style={{ color: "white", margin: "10px 10px", float: "right" }}>Welcome {this.props.match.params.name}</h4>
          <button className="btn btn-secondary" style={{ margin: "10px 10px" }}>Sort</button>
          <button className="btn btn-secondary" style={{ margin: "10px 10px" }} onClick={this.goingToBookers}>Bookers</button>
          <button className="btn btn-secondary" style={{ margin: "10px 10px" }} onClick={this.goingToLogout}>Logout</button>

        </div>
        <br />
        <form onSubmit={this.onSubmit} className="d-flex justify-content-between w-90">
          <div className="form-group" style={{ width: "170vh" }}>
            <input
              type="text"
              name="flightId"
              placeholder="Search by Flight ID"
              className="form-control"
              value={this.state.flightId}
              onChange={this.onChange}
            />
          </div>
          <button className="btn btn-success" style={{ height: "6vh", width: "10vh" }} type="submit">
            Go
          </button>
        </form>

        <hr />
        <div>
          <table className="table table-default">
            <thead>
              <tr>
                <td>Flight ID</td>
                <td>Flight Source</td>
                <td>Flight Destination</td>
                <td>Flight Arrival</td>
                <td>Flight Departure</td>
                <td>Flight Status</td>
                <td></td>
              </tr>
            </thead>
            <tbody>{flightList}</tbody>
          </table>
        </div>
        {/* 
        <div>
          <table className="table table-default">
            <thead>
              <tr>
                <td>Booking ID</td>
                <td>first name</td>
                <td>last name</td>
                <td>status</td>
              </tr>
            </thead>
            <tbody>{flightList}</tbody>
          </table>
        </div> */}

      </div>
    );
  }
}

export default withRouter(SearchId);
