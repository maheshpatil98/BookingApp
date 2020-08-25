import React, { Component } from "react";

export class SearchId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flightId: "",
      data: [{}],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
        <td>{pass.bookId}</td>
        <td>{pass.firstname}</td>
        <td>{pass.lastname}</td>
        <td>{pass.status}</td>
        {/* <td>
                <button
                  className="btn btn-primary"
                  onClick={() => this.routeChange(flight)}
                >
                  Book
                </button>
              </td> */}
      </tr>
    ));
    return (
      <div>
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
          <table className="table table-dark">
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
        </div>
      </div>
    );
  }
}

export default SearchId;
