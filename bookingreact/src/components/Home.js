import React, { Component } from "react";

class Home extends Component {




  constructor(props) {
    super(props);

    this.state = {
      source: "",
      destination: "",
      flightData: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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



    return <div>


      <div>

        <div className="contianer-sm w-60  mb-3" style={{ float: "left", left: "20%", alignSelf: "flex-start" }}>
          <table className="table table-light">
            {flightList}
          </table>
        </div>


        <div className="card border-dark mb-3" style={{ maxWidth: "18rem", float: "left", left: "30%" }}>
          <div className="card-header">Start Your Journey</div>
          <div className="card-body text-dark">
            <h5 className="card-title">Search Flights</h5>


            <form className="w-90" onSubmit={this.onSubmit}>
              <div>
                <label>Source</label>
                <input
                  type="text"
                  name="source"
                  placeholder="Source"
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
                  className="form form-control"
                  onChange={this.onChange}
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary" >
                Search
    </button>
            </form>
          </div>
        </div>
      </div>


    </div>;
  }
}

export default Home;
