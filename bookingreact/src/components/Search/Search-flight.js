import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { Dropdown } from "react-bootstrap";

class SearchId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flightId: "",
      data: [{}], dataa: "",
      tokenn: this.props.match.params.token,
      updateForm: false,
      updateId: "", propName: "",
      newValue: "", sortForm: false,
      criteria1: "", criteria2: "",
      ord1: "", ord2: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goingToAdd = this.goingToAdd.bind(this);
    this.goingToLogout = this.goingToLogout.bind(this);
    this.routeChangeDelete = this.routeChangeDelete.bind(this);
    this.goingToBookers = this.goingToBookers.bind(this);
    this.routeChangeUpdate = this.routeChangeUpdate.bind(this);
    this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.goingToSort = this.goingToSort.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  goingToAdd() {
    let path = "/addflight/" + this.props.match.params.token + "/" + this.props.match.params.name;
    this.props.history.push(path);
  }

  goingToBookers() {
    let path = "/bookingsinflight/" + this.props.match.params.token + "/" + this.props.match.params.name;
    this.props.history.push(path);
  }

  goingToLogout() {
    this.setState({ tokenn: "" });
    let path = "/";
    this.props.history.push(path);
  }

  componentWillMount() {
    fetch("http://localhost:7001/flights/sort/flightSource/1")
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
        this.setState({ data: rems });
      });
  }


  onUpdateSubmit() {
    const Post = [{
      propName: this.state.propName,
      value: this.state.newValue
    }]

    fetch("http://localhost:7001/flights/" + this.state.updateId, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + this.state.tokenn
      },
      body: JSON.stringify(Post)
    })
      .then((dat) => {
        alert("Data Updated Successfully");
        console.log(dat);
        this.setState({ bookId: "", propName: "", newValue: "" });
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  routeChangeUpdate(fly) {
    return (<form className="d-flex justify-content-between w-90" style={{ width: "70rem" }} onSubmit={this.onUpdateSubmit} >
      <Dropdown >
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Select the Value You Wish to Update
            </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => { this.setState({ propName: "flightSource" }) }}>Source</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ propName: "flightDestinaion" }) }}>Destination</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ propName: "flightArrival" }) }}>Arrival</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ propName: "flightDeparture" }) }}>Departure</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ propName: "flightStatus" }) }}>Status</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>


      <div>

        <input
          type="text"
          name="newValue"
          className="form-control"
          style={{ width: "47rem" }}
          placeholder="Enter the New Value"
          value={this.state.newValue}
          onChange={this.onChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Update
</button>
    </form>)
  }

  defaultview() {
    return <div></div>

  }


  onSearchSubmit() {
    const criteria1 = this.state.criteria1;
    const order1 = this.state.ord1;
    console.log("http://localhost:7001/sort" + criteria1 + order1);

    fetch("http://localhost:7001/sort/" + criteria1 + "/" + order1)
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




  goingToSort() {
    this.setState({ sortForm: !this.state.sortForm });
  }
  routeSort() {
    return (<form className="d-flex justify-content-between" style={{ width: "55rem" }} onSubmit={this.onSearchSubmit} >
      <Dropdown >
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Select the 1st Value to Sort
          </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => { this.setState({ criteria1: "" }) }}>Null</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ criteria1: "flightSource" }) }}>Source</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ criteria1: "flightDestinaion" }) }}>Destination</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ criteria1: "flightArrival" }) }}>Arrival</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ criteria1: "flightDeparture" }) }}>Departure</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ criteria1: "flightStatus" }) }}>Status</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown >
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Criteria 1
          </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => { this.setState({ ord1: "" }) }}>Null</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ ord1: '1' }) }}>Ascending</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ ord1: '-1' }) }}>Descending</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown >
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Criteria 2
          </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => { this.setState({ ord2: 0 }) }}>Null</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ ord2: 1 }) }}>Ascending</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ ord2: -1 }) }}>Descending</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <button type="submit" className="btn btn-primary">
        Sort
</button>
    </form>)
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
        <td>
          <button
            className="btn btn-secondary"
            onClick={() => { this.setState({ updateForm: !this.state.updateForm }); this.setState({ updateId: pass.flightId }); }}
          >
            Update
          </button>
        </td>
      </tr>
    ));




    return (
      <div className="container-sm w-90">

        <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#121212" }}>
          <button className="btn btn-secondary" style={{ margin: "10px 10px" }} onClick={this.goingToAdd} >Add Flight</button> <hr />
          <h4 style={{ color: "white", margin: "10px 10px" }}>Welcome {this.props.match.params.name}</h4>
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
          <div>
            {this.state.updateForm ? this.routeChangeUpdate() : this.defaultview()}
          </div>
          <div>
            {this.state.sortForm ? this.routeSort() : this.defaultview()}
          </div>
          <div className="container-m">
            <table className="table table-hover">
              <thead>
                <tr>
                  <td> <button className="btn btn-outline-secondary" style={{ width: "10rem", height: "4rem", margin: "10px 10px" }} onClick={() => {
                    this.setState({ data: this.state.data.sort((a, b) => (a.flightId > b.flightId ? 1 : -1)) })
                  }}>flightId</button></td>
                  <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                    const a = this.state.data.sort((a, b) => (a.flightSource > b.flightSource ? 1 : -1));
                    this.setState({ data: a });
                  }}>Flight Source</button></td>
                  <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                    const a = this.state.data.sort((a, b) => (a.flightDestination > b.flightDestination ? 1 : -1));
                    this.setState({ data: a });
                  }}>Flight Destination</button></td>
                  <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                    const a = this.state.data.sort((a, b) => (a.flightArrival > b.flightArrival ? 1 : -1));
                    this.setState({ data: a });
                  }}>Flight Arrival</button></td>
                  <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                    const a = this.state.data.sort((a, b) => (a.flightDeparture > b.flightDeparture ? 1 : -1));
                    this.setState({ data: a });
                  }}>Flight Departure</button></td>
                  <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                    const a = this.state.data.sort((a, b) => (a.flightStatus > b.flightStatus ? 1 : -1));
                    this.setState({ data: a });
                  }}>Flight Status</button></td>
                  <td></td>
                </tr>
              </thead>
              <tbody>{flightList}</tbody>
            </table>
          </div>

        </div>


      </div>
    );
  }
}

export default withRouter(SearchId);
