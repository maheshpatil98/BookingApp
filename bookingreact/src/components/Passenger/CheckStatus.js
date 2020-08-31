import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

class CheckStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookData: [{}],
            token: this.props.match.params.bookid,
            isForm: false,
            propName: "Select Value",
            newValue: "",
            isShow: false,
            flightData: [{}],
            source: "",
            destination: "",
            showlists: false,
            data: []
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    // This function Updates the property of entity, Basically a submit function after filling update form 
    onSubmit(flight) {
        const Post = [{
            propName: this.state.propName,
            value: this.state.newValue
        }]

        fetch("http://localhost:7002/bookings/" + this.state.bookId, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + this.state.tokenn
            },
            body: JSON.stringify(Post)
        })
            .then((dat) => {
                console.log(dat);
                alert("Data Updated Successfully");
                this.setState({ bookId: "", propName: "", newValue: "" });
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //get all booked tickets booked before
    componentWillMount() {
        fetch("http://localhost:7002/bookings/get/status/" + this.state.token, {
            method: "GET"
        })
            .then((response) =>
                response.json().catch((err) => {
                    console.err(`'${err}' happened!`);
                    return {};
                })
            )
            .then((json) => {
                console.log(json);
                this.setState({ bookData: json });
            })
            .catch((err) => {
                console.log("fetch request failed: ", err);
            });


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

    getaform() {
        return (
            <div className="container-sm " style={{ width: "28rem", textAlign: "center", alignSelf: "center", alignContent: "center" }}>

                <form style={{ textAlign: "center" }} onSubmit={this.onSubmit} >
                    <h5 className="card-title">Edit The Certain Fields</h5>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ width: "28rem" }}>
                            {this.state.propName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item key="1" onClick={() => { this.setState({ propName: "firstname" }) }}>First Name</Dropdown.Item>
                            <Dropdown.Item key="2" onClick={() => { this.setState({ propName: "lastname" }) }}>Last Name</Dropdown.Item>
                            <Dropdown.Item key="3" onClick={() => { this.setState({ propName: "email" }) }}>E mail</Dropdown.Item>
                            <Dropdown.Item key="4" onClick={() => { this.setState({ propName: "number" }) }}>Number</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <br />

                    <div>
                        <label>Enter the New Value</label>
                        <input
                            type="text"
                            name="newValue"
                            className="form-control"
                            value={this.state.newValue}
                            onChange={this.onChange}
                        />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">
                        Update
    </button>
                </form>
            </div>);
    }

    getsomething() {
        return (<div></div>);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSearchSubmit(e) {
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
                this.setState({ flightData: json });
                this.setState({ showlists: !this.state.showlists });

            })
            .catch((err) => {
                console.log("fetch request failed: ", err);
            });


    }

    bookit(e) {

        const Post = {
            firstname: this.state.bookData[0].firstname,
            lastname: this.state.bookData[0].lastname,
            userId: this.state.bookData[0].userId,
            number: this.state.bookData[0].number,
            Nationality: this.state.bookData[0].Nationality,
            status: this.state.bookData[0].status,
            email: this.state.bookData[0].email,
            password: this.state.bookData[0].password
        }
        console.log(Post);


        fetch("http://localhost:7002/bookings/book/" + e.flightId + "/" + Post.userId, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(Post),
        })
            .then((res) => res.json())
            .then((rems) => {
                console.log(rems);
                alert(
                    `Booked succesfully with booking ID ${rems.bookId}`
                );
                window.location.reload();
            });
    }

    showflights() {

        const flightList = this.state.flightData.map((flight) => (
            <div className="card" style={{ width: "28rem" }} >
                <div className="card-body" style={{ textAlign: "center", alignContent: "center", alignItems: "center" }} key={flight._id}>
                    <h5 className="card-title">Ticket</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Flight ID: {flight.flightId}</h6>
                    <p className="card-text">Flight Source: {flight.flightSource}</p>
                    <p className="card-text">Flight Destination: {flight.flightDestination}  </p>
                    <p className="card-text">flight Arrival: {flight.flightArrival} Flight Departure: {flight.flightDeparture} </p>


                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                const a = prompt("Type confirm to continue booking");
                                a == "CONFIRM" ? this.bookit(flight) : alert("Booking Cancelled")
                            }}
                        >
                            Book
                    </button>
                    </div>
                </div>
            </div >
        ));

        return flightList;

    }

    showSearch(e) {

        return (
            <div>
                <form className="container-sm" style={{ textAlign: "center" }} onSubmit={this.onSearchSubmit} >
                    <div className="card-body " style={{ width: "28rem", alignContent: "center", alignItems: "center" }}>
                        <h5 className="card-title">Start Your Journey Today !</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Search Flight Here</h6>
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
                        <button type="submit" className="btn btn-primary" >
                            Search
          </button>
                    </div>
                </form>

                {(this.state.showlists) ? this.showflights() : this.getsomething()}
            </div>
        )
    }




    render() {

        let path = "/flights";
        const BookList = this.state.bookData.map((fly) => (
            <div className="card" style={{ width: "28rem" }}>
                <div className="card-body" style={{ textAlign: "center", alignContent: "center", alignItems: "center" }}>
                    <h5 className="card-title">Ticket</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Booking ID: {fly.bookId}</h6>
                    <p className="card-text">Flight Number: {fly.flightID}</p>
                    <p className="card-text">Full Name: {fly.firstname}  {fly.lastname}</p>
                    <p className="card-text">Number: {fly.number}  Nationality: {fly.Nationality} </p>
                    <p className="card-text">Email: {fly.email}</p>
                    <p className="card-text">Flight Status: {fly.status}</p>

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-secondary" onClick={() => { this.setState({ isForm: !this.state.isForm }); this.setState({ bookId: fly.bookId }) }}> Edit</button>
                        <button className="btn btn-danger" onClick={() => {
                            fetch("http://localhost:7002/bookings/book/" + fly.bookId, { method: "DELETE" }).then((e) => e.json()).then((rems) => {
                                console.log(rems); alert(`message : ${rems.message}`)
                                window.location.reload();
                            })
                                .catch((err) => { console.log(err); alert(`error occured ${err}`) })
                        }}> Delete</button>
                        <button className="btn btn-primary" > Pay</button>
                    </div>
                </div>
            </div >
        ));


        const flightList = this.state.data.map((flight) => (
            <tr key={flight._id}>
                <td>{flight.flightId}</td>
                <td>{flight.flightSource}</td>
                <td>{flight.flightDestination}</td>
                <td>{flight.flightArrival}</td>
                <td>{flight.flightDeparture}</td>
                <td></td>
            </tr>
        ));

        return (
            <div className="container-sm w-90">

                <div className=" d-flex justify-content-between" style={{ backgroundColor: "#121212" }}>
                    <button className="btn btn-primary" style={{ margin: "10px 10px" }} onClick={() => { this.setState({ isShow: !this.state.isShow }) }} >Book New Flight</button>
                    <h4 style={{ margin: "10px 10px", color: "white" }}>Welcome {this.state.bookData[0].firstname}</h4>
                    <button className="btn btn-primary" style={{ margin: "10px 10px" }} onClick={() => { this.setState({ token: "" }); this.props.history.push(path); }} >Logout</button>
                </div>
                <hr />
                <div className="d-flex justify-between">
                    <div className="container-sm" >
                        {BookList}
                    </div>

                    <div>
                        <div style={{ textAlign: "center" }}>{this.state.isForm ? this.getaform() : this.getsomething()}</div>
                    </div>

                    <div>
                        <div style={{ textAlign: "center" }}>{this.state.isShow ? this.showSearch() : this.getsomething()}</div>
                    </div>


                </div>
                <h5>Available Flights</h5>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td> <button className="btn btn-outline-secondary" style={{ width: "10rem", margin: "10px 10px" }} onClick={() => {
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
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>{flightList}</tbody>
                </table>

            </div>
        )
    }
}

export default withRouter(CheckStatus)
