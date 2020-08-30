import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

class BookingsInFlight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bookData: [{}],
            tokenn: this.props.match.params.id,
            isForm: false,
            propName: "",
            newValue: "",
            bookId: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    routeChangeDelete(flight) {
        console.log(flight.flightId);
        fetch("http://localhost:7003/flights/pass/delete/" + flight.bookId, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + this.state.tokenn
            }
        })
            .then((dat) => {
                //console.log(dat);
                if (dat) {
                    alert("Data deleted Successfully");
                    window.location.reload();
                }
                else {
                    alert("Error Occured");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    componentWillMount() {
        fetch("http://localhost:7002/bookings/", {
            method: "GET"
        })
            .then((response) =>
                response.json().catch((err) => {
                    console.err(`'${err}' happened!`);
                    return {};
                })
            )
            .then((json) => {
                console.log("parsed json: ", json);
                console.log(this.state.bookData);
                this.setState({ bookData: json.passengers });
                console.log(this.state.bookData);
            })
            .catch((err) => {
                console.log("fetch request failed: ", err);
            });
    }

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
                this.setState({ bookId: "" });
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getaform() {
        return (
            <div className="container-sm " style={{ width: "28rem" }}>

                <form style={{ textAlign: "center" }} onSubmit={this.onSubmit} >
                    <h5 className="card-title">Edit The Certain Fields</h5>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            Select the Value You Wish to Update
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { this.setState({ propName: "firstname" }) }}>First Name</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.setState({ propName: "lastname" }) }}>Last Name</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.setState({ propName: "email" }) }}>E mail</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.setState({ propName: "number" }) }}>Number</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.setState({ propName: "status" }) }}>Status</Dropdown.Item>
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
                        Search
    </button>
                </form>
            </div>);
    }

    getsomething() {
        return (<div></div>);
    }
    render() {

        let path = "/search/" + this.state.tokenn;


        const BookList = this.state.bookData.map((fly) => (
            <div className="card" style={{ width: "28rem" }}>
                <div className="card-body " style={{ textAlign: "center", alignContent: "center", alignItems: "center" }}>
                    <h5 className="card-title">Flight Number: {fly.flightID}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Booking ID: {fly.bookId}</h6>
                    <p className="card-text">Email: {fly.email}   Nationality: {fly.Nationality}</p>
                    <p className="card-text">Full Name: {fly.firstname}  {fly.lastname}</p>
                    <p className="card-text">Flight Status: {fly.status}</p>

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-primary" onClick={() => { this.setState({ isForm: !this.state.isForm }); this.setState({ bookId: fly.bookId }) }}> Edit</button>
                        <button className="btn btn-danger" onClick={() => this.routeChangeDelete(fly)}> Delete</button>
                    </div>

                </div>

            </div>
        ));

        return (
            <div className="container-sm w-80">
                <div style={{ backgroundColor: "#121212" }}>
                    <button className="btn btn-primary" onClick={() => { this.props.history.push(path); }}>Back</button>
                </div>
                <div className="d-flex justify-content-between">
                    <div>
                        <tbody>{BookList}</tbody>
                    </div>
                    <div>
                        <div style={{ textAlign: "center" }}>{this.state.isForm ? this.getaform() : this.getsomething()}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BookingsInFlight);
