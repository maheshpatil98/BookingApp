import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Flight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: "",
      destination: "",
      flightData: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    console.log(e);
    let path = "/book/" + e.flightId;
    this.props.history.push(path);
  };

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
    return (
      <div>
        <form className="container-sm w-25" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="source"
            value={this.state.source}
            className="form form-control"
            onChange={this.onChange}
          />
          <br />

          <input
            type="text"
            name="destination"
            value={this.state.destination}
            className="form form-control"
            onChange={this.onChange}
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
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
