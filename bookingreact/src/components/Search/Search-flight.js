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
    let path = "/bookingsinflight";
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

        <div style={{ display: "flex", flexDirection: "row", backgroundColor: "gray" }}>
          <button className="btn btn-success" onClick={this.goingToAdd} >Add Flight</button> <hr />
          <button className="btn btn-success">Sort</button>
          <button className="btn btn-success" onClick={this.goingToLogout}>Logout</button>
          <button className="btn btn-success" onClick={this.goingToBookers}>Bookers</button>
        </div>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>search by flight Id</label>
            <input
              type="text"
              name="flightId"
              placeholder="insert flight ID"
              className="form-control"
              value={this.state.flightId}
              onChange={this.onChange}
            />
          </div>
          <button className="btn btn-success" type="submit">
            Done
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
