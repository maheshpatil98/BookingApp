import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Dropdown, Button, ButtonToolbar, Form } from "react-bootstrap";
import AddFlight from "../Admin/AddFlight";
import Update from "./Update";
import { connect } from "react-redux";
import { fetchFlights, deleteFlight, addflight } from "../../actions/postAction";

class SearchId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flightId: "",
      data: [], dataa: "",
      tokenn: this.props.match.params.token,
      updateForm: false,
      updateId: "",
      addModalShow: false,
      updateModalShow: false,
      updateValue: "Select Value",
      propName: "Select Value",
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

    this.onSearchSubmit = this.onSearchSubmit.bind(this);

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

    this.props.fetchFlights();
    this.setState({ data: this.props.flightData })

  }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.delete.message !== undefined) {
  //     console.log(this.props.delete.message);
  //     alert("Deleted Sucesfully");
  //   }
  //   else {
  //     console.log(newProps);
  //   }
  // }

  routeChangeDelete(flight) {
    try {
      this.props.deleteFlight(flight, this.state.tokenn);
      alert("Deleted Succesfully");
      window.location.reload();
    }
    catch (err) {
      console.log(err);
      alert("Error Occured" + err);
      window.location.reload();
    }
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


  // onUpdateSubmit() {
  //   const Post = [{
  //     propName: this.state.propName,
  //     value: this.state.newValue
  //   }]

  //   fetch("http://localhost:7001/flights/" + this.state.updateId, {
  //     method: "PATCH",
  //     headers: {
  //       "content-type": "application/json",
  //       "Authorization": "Bearer " + this.state.tokenn
  //     },
  //     body: JSON.stringify(Post)
  //   })
  //     .then((dat) => {
  //       alert("Data Updated Successfully");
  //       console.log(dat);
  //       this.setState({ bookId: "", propName: "", newValue: "" });
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }

  routeChangeUpdate(fly) {
    return (<form className="d-flex justify-content-between w-90" style={{ width: "70rem" }} onSubmit={this.onUpdateSubmit} >
      <Dropdown >
        <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ width: "17rem" }}>
          {this.state.updateValue}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => { this.setState({ updateValue: "Source" }); this.setState({ propName: "flightSource" }) }}>Source</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ updateValue: "Destination" }); this.setState({ propName: "flightDestination" }) }}>Destination</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ updateValue: "Arrival" }); this.setState({ propName: "flightArrival" }) }}>Arrival</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ updateValue: "Departure" }); this.setState({ propName: "flightDeparture" }) }}>Departure</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ updateValue: "Status" }); this.setState({ propName: "flightStatus" }) }}>Status</Dropdown.Item>
          <Dropdown.Item onClick={() => { this.setState({ updateValue: "Amount" }); this.setState({ propName: "amount" }) }}>amount</Dropdown.Item>
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


  render() {

    let updateModalClose = () => this.setState({ updateModalShow: false });
    let addModalClose = () => this.setState({ addModalShow: false });
    //console.log(this.props.flightData);
    const flightList = this.props.flightData.flights.map((pass) => (
      <tr key={pass.flightId}>
        <td>{pass.flightId}</td>
        <td>{pass.flightSource}</td>
        <td>{pass.flightDestination}</td>
        <td>{pass.flightArrival}</td>
        <td>{pass.flightDeparture}</td>
        <td>{pass.flightStatus}</td>
        <td>{pass.amount}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.routeChangeDelete(pass)}
          >
            Delete
          </button>
        </td>
        <td>
          {/* <button
            className="btn btn-secondary"
            onClick={() => { this.setState({ updateForm: !this.state.updateForm }); this.setState({ updateId: pass.flightId }); }}
          >
            Update
          </button> */}
          <ButtonToolbar>
            <Button
              variant="outline-secondary"
              onClick={() => { this.setState({ updateId: pass.flightId }); this.setState({ updateModalShow: true }); }}
            >Update</Button>

            <Update
              show={this.state.updateModalShow}
              onHide={updateModalClose}
              tokeen={this.props.match.params.token}
              flightid={this.state.updateId}
            />
          </ButtonToolbar>
        </td>
      </tr>
    ));



    return (
      <div>
        <hr />
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-primary" style={{ margin: "10px 10px" }} onClick={this.goingToAdd} >Add Flight</button>
            {/* <ButtonToolbar>
              <Button
                variant="outline-primary"
                onClick={() => this.setState({ addModalShow: true })}
              >Add Flight</Button>

              <AddFlight
                show={this.state.addModalShow}
                onHide={addModalClose}
              />
            </ButtonToolbar> */}
            <button className="btn btn-outline-primary" style={{ margin: "10px 10px" }} onClick={this.goingToBookers}>Bookers</button></div>
          <h4 style={{ margin: "10px 10px", textAlign: "center" }}>Welcome {this.props.match.params.name}</h4>
          <button className="btn btn-outline-warning" style={{ margin: "10px 10px" }} onClick={this.goingToLogout}><b>Logout</b></button>
        </div>
        <hr />


        <div className="container-sm w-90">

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

          <div>
            <div className="container-m">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <td> <button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                      this.setState({ data: this.state.data.sort((a, b) => (a.flightId > b.flightId ? 1 : -1)) })
                    }}>Flight Id</button></td>
                    <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                      const a = this.state.data.sort((a, b) => (a.flightSource > b.flightSource ? 1 : -1));
                      this.setState({ data: a });
                    }}>Source</button></td>
                    <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                      const a = this.state.data.sort((a, b) => (a.flightDestination > b.flightDestination ? 1 : -1));
                      this.setState({ data: a });
                    }}>Destination</button></td>
                    <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                      const a = this.state.data.sort((a, b) => (a.flightArrival > b.flightArrival ? 1 : -1));
                      this.setState({ data: a });
                    }}>Arrival</button></td>
                    <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                      const a = this.state.data.sort((a, b) => (a.flightDeparture > b.flightDeparture ? 1 : -1));
                      this.setState({ data: a });
                    }}>Departure</button></td>
                    <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                      const a = this.state.data.sort((a, b) => (a.flightStatus > b.flightStatus ? 1 : -1));
                      this.setState({ data: a });
                    }}>Status</button></td>
                    <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                      const a = this.state.data.sort((a, b) => (a.amount > b.amount ? 1 : -1));
                      this.setState({ data: a });
                    }}>Price</button></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>{flightList}</tbody>
              </table>
            </div>

          </div>


        </div>



      </div>
    );
  }
}

const mapStateToProps = state => ({
  flightData: state.posts,
  newFlight: state.posts.flight,
  delete: state.posts.delete
})
export default connect(mapStateToProps, { fetchFlights, deleteFlight, addflight })(withRouter(SearchId));


